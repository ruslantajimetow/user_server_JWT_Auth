const { User } = require('../../db/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = require('../../utils/generateToken');
const cookieConfig = require('../../configs/cookieConfig');

const postLogin = async (req, res) => {
  try {
    const { password, email } = req.body;

    const user = await User.findOne({ where: { email: email.toLowerCase() } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const plainUser = user.get();
      delete plainUser.password;
      const { accessToken, refreshToken } = generateToken({ user: plainUser });

      return res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({ user: plainUser, accessToken });
    } else {
      return res.status(400).send('Invalid credentials. Please try again');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send('Something went wrong. Please try again!');
  }
};

module.exports = postLogin;
