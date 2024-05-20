/* const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
    const authHeader = req.cookies.token;
    if(!authHeader) {
        const error = new Error('Utilisateur non enregistré');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'secretfortoken');
    }
    catch(err){
        err.statusCode = 500;
        throw err;
    }
    if(!decodedToken){
        const error = new Error('Utilisateur non enregistré');
        error.statusCode = 401;
        throw error;
    }
    if(!decodedToken.isAdmin) {
        const error = new Error('Privilèges insufisants');
        error.statusCode = 401;
        throw error;
    }
    req.isLoggedIn = true;
    req.userId = decodedToken.userId;
    req.email = decodedToken.email;
    next();
}; */

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.cookies.token;
    if(!authHeader) {
        const error = new Error('Utilisateur non enregistré');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'secretfortoken');
    }
    catch(err){
        err.statusCode = 500;
        throw err;
    }
    if(!decodedToken){
        const error = new Error('Utilisateur non enregistré');
        error.statusCode = 401;
        throw error;
    }
    if(!decodedToken.isAdmin){
        const error = new Error('privilèges insuffisants');
        error.statusCode = 401;
        throw error;
    }
    req.isLoggedIn = true;
    req.userId = decodedToken.userId;
    req.email = decodedToken.email;
    next();
};