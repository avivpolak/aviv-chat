const User = require('../models/user.js');

exports.listAllUsers = async (req, res, next) => {
  try {
    console.log('userlist');
    const userList = await User.find({});
    console.log(userList, 'userlist');
    res.status(200).json(userList);

    // this is what i assume you meant
    if (userList.length === 0) next(new Error('no users found in db'));
  } catch (error) {
    next(error);
  }
};
exports.addNewUser = async (req, res, next) => {
  try {
    const { username, email, bio, birthDate } = req.body;
    const newUser = await User.create({
      username,
      email,
      bio,
      birthDate,
    });
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};
// put all your user functions here :
