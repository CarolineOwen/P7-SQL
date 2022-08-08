const mongoose = require("mongoose");//plugin mongoose pour controler la base de donnée

//modele de donnees pour creer modifier les posts
const postSchema = mongoose.Schema({
  //fonction schema avec un objet
  userId: { type: String, required: true },
  comments: { type: String, required: true },
  imageUrl: { type: String, required: false },
  email: {type: String, required: false},
  pseudo: { type: String, required: false },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
  createdAt: { type: Date }
},
  { timestamps: true });

module.exports = mongoose.model("Post", postSchema);//exporter ce modele pour l'exploiter