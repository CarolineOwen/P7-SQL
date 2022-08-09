const mongoose = require("mongoose"); //plugin mongoose pour controler la base de donnée
const uniqueValidator = require("mongoose-unique-validator"); //utilise le package unique validator
const {isEmail} = require('validator');

const userSchema = mongoose.Schema({
  //fonction schema avec un objet
  email: { type: String, required: true, unique: true, trim: true, validate: [isEmail] }, //unique: pour ne pas s'inscrire plusieurs fois avec la même adresse mail
  password: { type: String, required: true },
  role: { type: String },
  pseudo: {type: String, required: true, maxLength: 20, trim:true, unique:true}
});

userSchema.plugin(uniqueValidator); //s'assurer qu'on ne peut pas avoir plusieurs utilisateur avec le meme email

module.exports = mongoose.model("User", userSchema); //exporter ce modele pour l'exploiter
