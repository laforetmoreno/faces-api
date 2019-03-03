const Post = require('../models/Post');

const create = async (req, res) => {
  const { 
    originalname: name, 
    size, 
    key,
    location: url = ''
  } = req.file;

  try {
    const post = await Post.create({
      name,
      size,
      key,
      url,
    });
  
    return res.json(post);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

const retrieveAll = async (req, res) => {
  const list = await Post.find();

  try {
    return res.json(list);
  } catch (error) {
    return res.status(404).json(error.message)
  }
}

const deleteById = async (req, res) => {
  const image = await Post.findById(req.params.id);

  try {
    await image.remove();

    return res.json('Image deleted successfully.');
  } catch (error) {
    return res.status(404).json('The image can not be removed, possibly she does not.');
  }
}

module.exports = { create, retrieveAll, deleteById };