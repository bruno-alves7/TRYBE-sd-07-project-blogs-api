const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { genToken } = require('./genToken');
require('dotenv/config');

const validateName = (displayName) => {
  if (!displayName || displayName.length < 8) {
      const ERR_NAME = '"displayName" length must be at least 8 characters long';
    throw new Error(ERR_NAME);
  }
  return displayName;
};

const validateEmail = (email) => {
  if (!email) {
      const ERR_EMAIL = '"email" is required';
    throw new Error(ERR_EMAIL);
  }
  if (email) {
    const regexEmail = /\S+@\S+\.\S+/;
    if (!regexEmail.test(email)) {
        const ERR_EMAIL_FORM = '"email" must be a valid email';
      throw new Error(ERR_EMAIL_FORM);
    }
  }
};

const validatePassword = (password) => {
  const size = 6;
  if (!password) {
  const ERR_PASS = '"password" is required';
  throw new Error(ERR_PASS);
  }
  if (password.length < size) {
    const ERR_PASS_SIZE = '"password" length must be 6 characters long';
    throw new Error(ERR_PASS_SIZE);
  }
};

const checkingEmailExists = async (email) => {
  const exists = await User.findOne({ where: { email } });
  const MESSAGE = 'User already registered';
  if (exists !== null) {
    throw new Error(MESSAGE);
  }
};

const createUser = async (displayName, email, password, image) => {
  validateName(displayName);
  validateEmail(email);
  validatePassword(password);
  await checkingEmailExists(email);
  await User.create({ displayName, email, password, image });
  const token = genToken(email, password);
  console.log(token);
  return token;
};

const getAll = async () => {
    try {
        const all = await User.findAll();
        return all;
    } catch (error) {
        throw new Error(error);
    }
};

const getByPk = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (user === null) {
            throw new Error();
        }
        return user;
    } catch (error) {
        throw new Error(error);
    }
};

const decoded = async (token) => {
  const newSecret = process.env.JWT_SECRET;
  const result = jwt.verify(token, newSecret);
  const { id: userId } = await User.findOne({ where: { email: result.email } });
  return userId;
};

const remove = async (token) => {
  const id = await decoded(token);
    try {
        const user = await User.destroy({ where: { id } });
        return user;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
  createUser,
  getAll,
  getByPk,
  remove,
};