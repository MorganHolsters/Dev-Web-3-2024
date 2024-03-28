const jwt = require('jsonwebtoken');
const middleware = require('./auth'); 

describe('Auth Middleware', () => {
    it('should throw an error if no authorization header is present', () => {
        const req = {
            get: jest.fn().mockReturnValue(undefined)
        };
        expect(() => middleware(req, {}, () => {})).toThrow('Utilisateur non enregistré');
    });

    it('should throw an error if the authorization header is malformed', () => {
        const req = {
            get: jest.fn().mockReturnValue('Bearer')
        };
        expect(() => middleware(req, {}, () => {})).toThrow('jwt must be provided');
    });

    it('should throw an error if the token cannot be verified', () => {
        const req = {
            get: jest.fn().mockReturnValue('Bearer invalidtoken')
        };
        expect(() => middleware(req, {}, () => {})).toThrow('jwt malformed');
    });

    it('should set req.isLoggedIn to true if token is valid', () => {
        const decodedToken = {
            userId: 'user123',
            email: 'test@example.com'
        };
        const req = {
            get: jest.fn().mockReturnValue('Bearer validtoken'),
        };
        jwt.verify = jest.fn().mockReturnValue(decodedToken);
        middleware(req, {}, () => {});
        expect(req.isLoggedIn).toBe(true);
    });

    it('should set req.userId and req.email if token is valid', () => {
        const decodedToken = {
            userId: 'user123',
            email: 'test@example.com'
        };
        const req = {
            get: jest.fn().mockReturnValue('Bearer validtoken'),
        };
        jwt.verify = jest.fn().mockReturnValue(decodedToken);
        middleware(req, {}, () => {});
        expect(req.userId).toBe(decodedToken.userId);
        expect(req.email).toBe(decodedToken.email);
    });

    it('should call next() if token is valid', () => {
        const decodedToken = {
            userId: 'user123',
            email: 'test@example.com'
        };
        const req = {
            get: jest.fn().mockReturnValue('Bearer validtoken'),
        };
        jwt.verify = jest.fn().mockReturnValue(decodedToken);
        const nextMock = jest.fn();
        middleware(req, {}, nextMock);
        expect(nextMock).toHaveBeenCalled();
    });
});