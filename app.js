const express = require('express');//importation express
const cors = require('cors');
const app = express();// permet la création d'une application express
const helmet = require("helmet"); //Helmet aide a securiser l'API en configurant de maniere approprié des headers HTTP
const mongoose = require('mongoose');// package pour faciliter interactions avec MongoBd
const path = require("path");
const dotenv = require('dotenv');
const result = dotenv.config();
const postsRoutes = require('./routes/posts');//importer le router pour les sauces
const userRoutes = require('./routes/user');


mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_ADDRESS}/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());//rend les données du corps de la requête exploitables, le formate pour en faciliter l'exploitation

app.use(cors());
app.use((
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "http://localhost:3001/"],
      "style-src": null,
    },
  })
));


//CORS: middleware appliqué à toute les requetes pour les passer sans problème, on rajoute des headers à toutes les réponses
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // étoile tout le monde peut accéder à l'API
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); //autorise toutes ces méthodes
  next(); //fonction qui renvoie à la prochaine fonction l'éxécution du serveur
});


app.use("/api/posts", postsRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;