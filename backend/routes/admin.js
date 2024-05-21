const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/',(req, res) => {
    res.send("admin");
});

//router.get('/info/user/:username', adminController);

router.get('/info/badges/:id?', adminController.infoBadges);

router.post('/badge/create', adminController.badgeCreate);

router.delete('/badge/delete/:id',adminController.badgeDelete);

router.post('/badge/give/:idBadge/:idUser',adminController.badgeGive);

router.delete('/badge/take/:idBadge/:idUser',adminController.badgeTake);

module.exports = router;