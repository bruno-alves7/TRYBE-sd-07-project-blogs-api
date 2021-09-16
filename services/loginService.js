const { User } = require('../models');
const { genToken } = require('./genToken');

const validateEmail = (email) => {
    if (email === undefined) {
    const ERR_EMAIL = '"email" is required';
  throw new Error(ERR_EMAIL);
    }
    if (email === '') {
        const ERR_EMAIL_EMPTY = '"email" is not allowed to be empty';
  throw new Error(ERR_EMAIL_EMPTY);
    }
};

const validatePassword = (password) => {
    if (password === undefined) {
        const ERR_PASS = '"password" is required';
      throw new Error(ERR_PASS);
    }
    if (password === '') {
            const ERR_PASS_EMPTY = '"password" is not allowed to be empty';
      throw new Error(ERR_PASS_EMPTY);
        }    
};

const userLogin = async (email, password) => {
    const user = await User.findOne({ where: { email, password } });
    if (user === null) {
        const ERR_MESSAGE = 'Invalid fields';
        throw new Error(ERR_MESSAGE);
  } else {
    const token = genToken(email, password);
    return token;
  }
};

const login = async (email, password) => {
    validateEmail(email);
    validatePassword(password);
    const token = userLogin(email, password);
    return token;
};
      
module.exports = {
    login,
};
