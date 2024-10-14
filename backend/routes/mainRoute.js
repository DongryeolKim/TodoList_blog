const express = require('express');
const router = express.Router();

const { viewAllContent, viewSeveralContent, createContent, updateContent, deleteContent } = require('../controllers/mainController')
const checkLogin = require('../middlewares/checkLogin');

router.route("/")
  .get(viewAllContent)
  .post(checkLogin, createContent)


router.route("/:cid")
  .get(viewSeveralContent)
  .delete(checkLogin, deleteContent)
  .put(checkLogin, updateContent)


module.exports = router;