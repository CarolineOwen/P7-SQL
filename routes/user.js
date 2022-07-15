const express = require("express");
const password = require('../middleware/password');
const router = express.Router();

const userCtrl = require("../controllers/user"); //associer les fonctions aux différentes routes

router.post("/signup", password, userCtrl.signup);//appliquer la fonction à la route mais avant controle du mdp fort
router.post("/login", userCtrl.login);

module.exports = router;