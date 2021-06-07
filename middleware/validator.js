const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv/config');

const newSecret = process.env.JWT_SECRET;

const validateToken = async (request, response, next) => {
  const token = request.headers.authorization;
  if (!token) {
    const ERROR = 401;
    return response.status(ERROR).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, newSecret);
    const user = await User.findOne({ where: { email: decoded.email } });

    if (!user) {
      const ERROR = 401;
      response.status(ERROR).json({ message: 'Expired or invalid token' });
    }
    request.user = user;
    next();
  } catch (error) {
    return response.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateToken;