const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const RefreshTokens = require('../models/refreshToken');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(403).send('No such email in our system');
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(403).send('incorrect Password');
    }

    const refreshToken = jwt.sign(user.toObject(), process.env.SECRET, {
      expiresIn: '24h',
    });

    const accessToken = jwt.sign(user.toObject(), process.env.SECRET, {
      expiresIn: '120s',
    });
    await RefreshTokens.create({ refreshToken });
    return res.send({
      refreshToken,
      accessToken,
      email,
      username: user.username,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    next(error);
  }
};
exports.addNewUser = async (req, res, next) => {
  try {
    const { username, email, password, bio, birthDate } = req.body;
    const isUserExsist = await User.exists({ email: email });
    if (isUserExsist) {
      return res.status(409).send('user already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      bio,
      birthDate,
      isAdmin: false,
    });
    console.log(user);
    res.status(201).send('Register Success');
  } catch (error) {
    next(error);
  }
};
exports.logout = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).send('Refresh Token Required');
    }

    const deletedTokenInDB = await RefreshTokens.findOneAndDelete({
      refreshToken: token,
    });
    if (!deletedTokenInDB) {
      return res.status(400).send('Already logged out');
    }

    return res.status(200).send('User Logged Out Successfully');
  } catch (error) {
    next(error);
  }
};

exports.getNewAccessToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(401).send('Refresh Token Required');
    }

    const tokenInDB = await RefreshTokens.findOne({
      refreshToken: token,
    });
    if (!tokenInDB) {
      return res.status(403).send('Token not Exsist');
    }
    console.log(tokenInDB.refreshToken);
    const user = jwt.decode(token);
    console.log(user);

    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 0,
    });

    return res.status(200).send({
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
// // put all your user functions here :
