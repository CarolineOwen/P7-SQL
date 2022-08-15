const multer = require("multer"); //package pour faciliter la gestion de fichiers

//extension de l'image acceptée
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

//enregistrer les fichiers sur le disque
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  //quel nom de fichier utiliser
  filename: (req, file, callback) => {
    
    //générer le nouveau nom du fichier
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    if (!extension){
      callback("null")
    }
    //date pour que chaque nom d'image soit unique, éviter les doublons
    else{callback(null, name + Date.now() + "." + extension)};
  },
});

module.exports = multer({ storage: storage }).single("image"); //fichier unique image