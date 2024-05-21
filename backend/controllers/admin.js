const { validationResult } = require('express-validator');

const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../util/database');

exports.infoBadges = async (req, res, next) => {
    try {
        
        if(req.params.id){
            const badgeInfo = await db.execute(
                'SELECT * FROM cheval.Badge WHERE idBadge = ?',
                [req.params.id]);
            res.status(201).json(badgeInfo);
        }
        else {
            const badgeInfo = await db.execute(
                'SELECT * FROM cheval.Badge'
            );
            res.status(201).json(badgeInfo);
        }
    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.badgeCreate = async (req, res, next) => {
    try {
    const ordre = req.body.order;
    const nom = req.body.name;
    const description = req.body.description;
    const iconUrl = req.body.iconUrl;

    const newBadge = await db.execute(
        'INSERT INTO cheval.Badge (ordre, nom, description, iconUrl) VALUES (?, ?, ?, ?)',
        [ordre, nom, description, iconUrl]);

    res.status(201).json({ message: 'nouveau badge crée' });

    return newBadge
    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

exports.badgeDelete = async (req, res, next) => {
    try {
        const id = req.params.id;

        const deletedBadge = await db.execute(
        'DELETE FROM cheval.Badge WHERE idBadge = ?',
        [id]);

        res.status(201).json({ message: 'Badge supprimé' });

    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.badgeGive = async (req, res, next) => {
    try {
        const giveBadge = await db.execute(
        'INSERT INTO cheval.UserBadge (idUser, idBadge, dateReception) '+
        'SELECT u.idUser, b.idBadge, CURDATE() '+
        'FROM cheval.User u, cheval.Badge b ' +
        'WHERE u.idUser = ? AND b.idBadge = ?',
        [req.params.idUser, req.params.idBadge]);

        /* "INSERT INTO cheval.UserBadge (idUser, idBadge, dateReception)
        SELECT u.idUser, b.idBadge, CURDATE()
        FROM cheval.User u, cheval.Badge b
        WHERE u.idUser = ? AND b.idBadge = ?" */

        res.status(201).json({ message: 'badge given' });

    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.badgeTake = async (req, res, next) => {
    try {
        const takeBadge = await db.execute(
        'DELETE FROM cheval.UserBadge WHERE idUser = ? AND idBadge = ?',
        [req.params.idUser, req.params.idBadge]);

        res.status(201).json({ message: 'badge removed from user'});
    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};