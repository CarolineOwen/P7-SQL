const Post = require('../models/Post');
const fs = require("fs");

//fonction creer un post
exports.createPost = (req, res, next) => {
  let data = {
    comments: req.body.comments,
    email: req.body.email,
    userId: req.auth.userId,
    pseudo: req.body.pseudo,
  }
  if (req.file) {
    data.imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  }

  const post = new Post(data);

  post
    .save()//enregistrer le fichier dans la base de données
    .then(() => {
      res.status(201).json({ message: "Post enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//fonction modifier un post
exports.modifyPost = (req, res, next) => {

  if (req.file) {
    Post.findOne({ _id: req.params.id })
      .then((objet) => {
        if (objet.imageUrl) {
          const filename = objet.imageUrl.split('/images')[1];
          fs.unlink(`images/${filename}`, (error) => {
            if (error) throw error;
          })
        }
      })
      .catch((error) => {
        console.log(error)
        res.status(404).json({ error })
      });
  } else { console.log("cet objet n'existe pas") }
  console.log(req.body.image === "")
  let postObject = req.file
    ? {
      comments: req.body.comments,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    }
    : { comments: req.body.comments };
  if (req.body.image === "") {
    postObject.imageUrl = null;
  }
  Post.updateOne(
    { _id: req.params.id },
    { ...postObject }
  )
    .then(() => res.status(200).json({ message: "Objet modifié" }))
    .catch((error) => res.status(401).json({ error }));
};

//fonction supprimer un post
exports.deletePost = (req, res, next) => {
  //recupérer l'objet en base
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      
      //vérifier que c'est bien le userId qui veut supprimer l'image
      //if (post.userId != req.auth.userId) {
      // res.status(401).json({ message: "Non-autorisé" });} else

      //unlink permet de supprimer le fichier
      if (post.imageUrl) {
        const filename = post.imageUrl.split("/images")[1];
        fs.unlink(`images/${filename}`, (error) => console.log(error))
      }

      //supprimer le fichier dans la base de données
      Post.deleteOne({ _id: req.params.id })
        .then(() => {
          
          // if ((post.userId != req.auth.userId) || req.auth.) {
          //   res.status(401).json({ message: "Non-autorisé" });
          // }
          res.status(200).json({ message: "objet supprimé" });
        })
        .catch((error) => res.status(401).json({ error }));
    })

    .catch((error) => res.status(500).json({ error }));
};

//fonction obtenir un post
exports.getOnePost = (req, res, next) => {
  //recupérer l'objet en base
  Post.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

//fonction obtenir toutes les posts
exports.getAllPosts = (req, res, next) => {
  Post.find({}, null, { sort: { "createdAt": "desc" } })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

//fonction pour les likes et les dislikes
exports.likesAndDislikes = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {

      if (!post.usersLiked.includes(req.body.userId) && req.body.like === 1) {
        Post.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
            $push: { usersLiked: req.body.userId },
          }
        )
          .then(() => res.status(201).json({ message: "like +1" }))
          .catch((error) => res.status(404).json({ error }));
      }

      if (post.usersLiked.includes(req.body.userId) && req.body.like === 1) {
        Post.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: -1 },
            $pull: { usersLiked: req.body.userId },
          }
        )
          .then(() => res.status(201).json({ message: "like 0" }))
          .catch((error) => res.status(404).json({ error }));
      }

      if (
        !post.usersDisliked.includes(req.body.userId) &&
        req.body.like === -1
      ) {
        Post.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: 1 },
            $push: { usersDisliked: req.body.userId },
          }
        )
          .then(() => res.status(201).json({ message: "dislike 1" }))
          .catch((error) => res.status(404).json({ error }));
      }

      if (
        post.usersDisliked.includes(req.body.userId) &&
        req.body.like === -1
      ) {
        Post.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: -1 },
            $pull: { usersDisliked: req.body.userId },
          }
        )
          .then(() => res.status(201).json({ message: "dislike 0" }))
          .catch((error) => res.status(404).json({ error }));
      }
    })
    .catch((error) => res.status(404).json({ error }));
};