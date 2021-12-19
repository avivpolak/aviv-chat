const twofactor = require('node-2fa');

exports.getNewSecret = async (req, res, next) => {
  try {
    const { email } = req.body;
    const appName = process.env.APPNAME;
    const newSecret = twofactor.generateSecret({
      appName,
      email,
    });
    console.log(newSecret);
    return res.send(newSecret);
  } catch (error) {
    next(error);
  }
};
exports.verify = async (req, res, next) => {
  try {
    const { secret, token } = req.body;
    const verify = twofactor.verifyToken(secret, token);
    console.log(verify);
    return res.send(verify);
  } catch (error) {
    next(error);
  }
};
exports.getNewToken = async (req, res, next) => {
  try {
    const { secret } = req.body;
    const { token: token } = twofactor.generateToken(secret);
    console.log(token);
    return res.send(token);
  } catch (error) {
    next(error);
  }
};
