const { signup, login } = require('./auth');
const User = require('../models/user'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../models/user', () => ({
  save: jest.fn(),
  find: jest.fn(),
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('signup', () => {
  let req, res, next;
  beforeEach(() => {
    req = {
      body: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should create a new user and return success message', async () => {
    User.save.mockResolvedValue();
    const hashedPassword = bcrypt.hash(req.body.password, 10);

    await signup(req, res, next);

    expect(User.save).toHaveBeenCalledWith({
      name: req.body.name,
      email: req.body.email,
      password : hashedPassword,
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Utilisateur enregistré' });
  });

  it('should handle errors', async () => {
    const errorMessage = 'Test Error';
    User.save.mockRejectedValue(new Error(errorMessage));

    await signup(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(next.mock.calls[0][0].message).toBe(errorMessage);
  });
});

describe('login', () => {
  let req, res, next;
  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should login successfully and return token and user id', async () => {
    const storedUser = {
      id: 'testUserId',
      email: 'test@example.com',
      password: 'hashedPassword',
    };
    User.find.mockResolvedValue([[storedUser]]);

    bcrypt.compare.mockResolvedValue(true);

    jwt.sign.mockReturnValue('testToken');

    await login(req, res, next);

    expect(User.find).toHaveBeenCalledWith(req.body.email);
    expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, storedUser.password);
    expect(jwt.sign).toHaveBeenCalledWith(
      {
        email: storedUser.email,
        userId: storedUser.id,
      },
      'secretfortoken',
      { expiresIn: '1h' }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: 'testToken', userId: 'testUserId' });
  });

  it('should handle no user found', async () => {
    User.find.mockResolvedValue([[]]);

    await login(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(next.mock.calls[0][0].statusCode).toBe(401);
  });

  it('should handle incorrect password', async () => {
    const storedUser = {
      id: 'testUserId',
      email: 'test@example.com',
      password: 'hashedPassword',
    };
    User.find.mockResolvedValue([[storedUser]]);

    bcrypt.compare.mockResolvedValue(false);

    await login(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(next.mock.calls[0][0].statusCode).toBe(401);
  });

  it('should handle errors', async () => {
    const errorMessage = 'Test Error';
    User.find.mockRejectedValue(new Error(errorMessage));

    await login(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(next.mock.calls[0][0].message).toBe(errorMessage);
  });
});