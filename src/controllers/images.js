const Images = require('../models/Images');

const create = async (req, res) => {
  const { 
    originalname: name, 
    size, 
    key,
    location: url = ''
  } = req.file;
  
  try {
    const image = await Images.create({
      name,
      size,
      key,
      url,
    });
  
    return res.json(image);
  } catch (error) {
    return res.json(error, 'We could not publish the image.');
  }
}

const retrieveAll = async (req, res) => {
  const images = await Images.find();

  try {
    return res.json(images);
    // return images;
  } catch (error) {
    return res.status(404).json(error.message)
  }
}

const deleteImage = async (req, res) => {
  const image = await Images.findById(req.params.id);

  try {
    await image.remove();

    return res.json('Image deleted successfully.');
  } catch (error) {
    return res.status(404).json('The image can not be removed, possibly she does not.');
  }
}

module.exports = { create, retrieveAll, deleteImage };