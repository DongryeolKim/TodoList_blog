const express = require('express');
const router = express.Router();

const { viewAllContent, viewSeveralContent, createContent, updateContent, deleteContent } = require('../controllers/mainController')

router.route("/")
  .get(viewAllContent)
  .post(createContent)


router.route("/:cid")
  .get(viewSeveralContent)
  .delete(deleteContent)
  .put(updateContent)


module.exports = router;