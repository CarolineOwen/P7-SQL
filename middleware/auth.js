const jwt = require("jsonwebtoken"); //package qui crée des tokens et les vérifie

//fonction d'authentification pour vérifier que le token est valide, s'il correspond à l'id de l'utilisateur dans la requête
module.exports = (req, res, next) => {
  try {
    //recuperation du token et decodage
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
      role: decodedToken.role
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
