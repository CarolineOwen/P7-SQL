const bcrypt = require("bcrypt"); //package de cryptage pour les mots de passe
const jwt = require("jsonwebtoken");//package qui crée des tokens et les vérifie
const User = require("../models/User");

//fonction enregistrement de nouveaux utilisateurs
exports.signup = (req, res, next) => {
  //hacher le mot de passe
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        pseudo: req.body.pseudo,
        password: hash,
      });
      user
        .save() //enregistrer le user dans la base de données
        .then(() => res.status(201).json({
          userId: user._id,
          pseudo: user.pseudo,
          role: user.role,
          //fonction sign qui encode les données qu'on veut encoder avec clé d'encodage et expiration du token
          token: jwt.sign({ userId: user._id, role: user.role }, process.env.TOKEN_SECRET, {
            expiresIn: "24h"
          })
        }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//fonction pour connecter des utilisateurs existants
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      //si utilisateur non trouvé
      if (!user) {
        return res
          .status(401)
          .json({ message: "Paire login/mot de passe incorrecte" });
      }
      //sinon comparer si le mot de passe est le bon par rapport à la base de données
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Paire login/mot de passe incorrecte" });
          }
          res.status(200).json({
            userId: user._id,
            role: user.role,
            email: user.email,
            pseudo: user.pseudo,
            //fonction sign qui encode les données qu'on veut encoder avec clé d'encodage et expiration du token
            token: jwt.sign({ userId: user._id, role:user.role }, process.env.TOKEN_SECRET, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};


