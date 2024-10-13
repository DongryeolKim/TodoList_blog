const asyncHandler = require('express-async-handler');

const Post = require('../models/Post');


const viewAllContent = asyncHandler(async (req, res, next) => {
  const data = await Post.find();

  if (!data || data.length === 0) {
    res.status(404).json({ message: "There is No data" })
    // return;
  };

  res.json({ data });
});




const viewSeveralContent = asyncHandler(async (req, res, next) => {
  const contentId = req.params.cid;

  const data = await Post.findById(contentId)

  if (!data || data.length === 0) {
    res.status(404).json({ message: "There is No data" })
  };

  res.json({ data });
})




const createContent = asyncHandler(async (req, res, next) => {
  const { title, body } = req.body;

  try {
    const data = await Post.create({ title, body });
    res.status(201).json({ message: 'Content created' });
  } catch (error) {
    res.status(500).json({ message: 'Error in content Create' });
  }
})




const updateContent = asyncHandler(async (req, res, next) => {
  const contentId = req.params.cid;

  const { title, body } = req.body;

  try {
    const data = await Post.findByIdAndUpdate(contentId, {
      title: title,
      body: body,
      createdAt: Date.now(),
    });
    res.status(201).json({ message: 'Content updated' })
  } catch (error) {
    res.status(500).json({ message: 'Error in content Update' })
  }
})




const deleteContent = asyncHandler(async (req, res, next) => {
  const contentId = req.params.cid;

  const data = await Post.findByIdAndDelete(contentId);

  if (!data) {
    res.status(404).json({ message: "Contents is not exist" })
  }

  res.status(204).json({ message: 'Completed delete' })
})




module.exports = { viewAllContent, viewSeveralContent, createContent, updateContent, deleteContent };