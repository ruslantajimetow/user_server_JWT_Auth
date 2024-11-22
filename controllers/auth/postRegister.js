const { User } = require('../../db/models');
const bcrypt = require('bcrypt');
const generateToken = require('../../utils/generateToken');
const cookieConfig = require('../../configs/cookieConfig');

const postRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return res.status(409).send('E-mail already in use!');
    } else {
      const newUser = await User.create({
        username,
        email: email.toLowerCase(),
        password: hashedPassword,
      });

      const plainUser = newUser.get();
      delete plainUser.password;

      const { accessToken, refreshToken } = generateToken({ user: plainUser });

      return res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({
          user: plainUser,
          accessToken,
        });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send('Error occured: Please try again!');
  }
};

module.exports = postRegister;
