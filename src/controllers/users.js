const User = require('../models/User');

const create = async (req, res) => {
  const { name, profession, sector, email, phone, avatar } = req.body;

  try {
    const user = await User.create({
      name,
      profession,
      sector,
      email,
      phone,
      avatar,
      avatar,
    });
    // avatar: `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${images.map(image => image.name)}.png`,
    return res.json(user);
  } catch (error) {
    res.json('We could not create the user.')
  }
}

const retrieveAll = async (req, res) => {
  const users = await User.find();

  try {
    return res.json(users);
  } catch (error) {
    return res.status(404).json(error, 'No users found.')
  }
}

const retrieveById = async (req, res) => {
  console.log(req.params.id, 'iddddd')
  const user = await User.findById(req.params.id);

  try {
    return res.json(user);
  } catch (error) {
    return res.status(404).json('This user possibly does not exist');
  }
}

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  try {
    await user.remove();

    return res.json('User deleted successfully.');
  } catch (error) {
    return res.status(404).json('The user can not be removed, possibly she does not.');
  }
}

module.exports = { 
  create, 
  retrieveAll, 
  retrieveById,
  deleteUser 
};