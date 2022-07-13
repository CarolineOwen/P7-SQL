const express = require("express");

const router = express.Router();

const userCtrl = require("../controllers/user"); //associer les fonctions aux différentes routes

router.post("/signup", userCtrl.signup);//appliquer la fonction à la route mais avant controle du mdp fort
router.post("/login", userCtrl.login);

module.exports = router;