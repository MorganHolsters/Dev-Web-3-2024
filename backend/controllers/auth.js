const { validationResult } = require('express-validator');

const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return;

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    try{
        const hashedPassword = await bcrypt.hash(password, 12);

        const userDetails = {
            name: name,
            email: email,
            password: hashedPassword,
        };
        const result = await User.save(userDetails);

        res.status(201).json({ message: 'Utilisateur enregistré' });
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.login = async(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try{
        const user = await User.find(email);

        if(user.length !== 1){
            const error = new Error('Aucun utilisateur avec cette adresse enregistré')
            error.statusCode = 401;
            throw error;
        }

        const storedUser = user[0];

        const isEqual = await bcrypt.compare(password, storedUser.hash);

        if(!isEqual) {
            const error = new Error('Mot de passe incorrect');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({
            email: storedUser.mail,
            userId: storedUser.idUser,
            isAdmin: storedUser.isAdmin
        },
        'secretfortoken',
        { expiresIn: '1h'}
        );

        res.cookie("token", token, {
            httpOnly: true
        });
        res.status(200).json({ token: token, userId: storedUser.idUser, admin: storedUser.isAdmin});

    } catch (err) {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.logout = async(req, res) => {
    try {
        res.cookie("token", '', {maxAge : 1});
        res.status(200).json({ message: 'logged out' });
    } catch (err) {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};