const jwt = require('jsonwebtoken');
require('dotenv').config();

const genToken = (email, password) => {
  const newSecret = process.env.JWT_SECRET;
    const jwtConfig = {
        expiresIn: 60 * 60,
        algorithm: 'HS256',
      };
    const token = jwt.sign({ email, password }, newSecret, jwtConfig);
      return token;
};

module.exports = {
    genToken,
};
