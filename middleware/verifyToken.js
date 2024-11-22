const jwt = require('jsonwebtoken');

const verifyRefreshToken = (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    res.locals.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Invalid refresh token' });
  }
};

const verifyAccessToken = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    res.locals.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Invalid access token' });
  }
};

module.exports = { verifyRefreshToken, verifyAccessToken };
