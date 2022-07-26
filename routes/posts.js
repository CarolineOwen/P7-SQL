const express = require('express');
const auth = require("../middleware/auth");
const router = express.Router();
const multer = require("../middleware/multer-config");

const postsCtrl = require('../controllers/posts');

router.post("/", multer, postsCtrl.createPost); // appliquer la fonction à la route, auth pour autentifer la route

router.put("/:id", auth, multer, postsCtrl.modifyPost);

router.delete("/:id", auth, postsCtrl.deletePost);

router.get("/:id", auth, postsCtrl.getOnePost);

router.get("/", auth, postsCtrl.getAllPosts);

router.post("/:id/like", auth, postsCtrl.likesAndDislikes);

module.exports = router;