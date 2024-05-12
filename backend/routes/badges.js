const express = require('express');

const router = express.Router();

const badges = ["5days","10days", "50days", "beginner", "medium", "advanced"];

router.get('/all',  (req, res, next) => {
    console.log('all the badges');
    res.status(200).send(badges);
  });

router.get('/user/:username',  (req, res, next) => {
    console.log("badges d'un user spécifique");
    console.log(req.params);
    console.log(req.query);
    res.send(200);
});
 
module.exports = router;