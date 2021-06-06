const userService = require('../services/userService');

const OK = 200;
const CREATE = 201;
const ERROR = 400;
const NOT_F = 404;
const CONFLICT = 409;

const userCreate = async (request, response) => {
  try {
    const { displayName, email, password, image } = request.body;
    const token = await userService.createUser(
      displayName, email, password, image,
);
    
    return response.status(CREATE).json({ token });
  } catch (error) {
    console.error(error);

    const { message } = error;
    if (message.includes('registered')) {
      return response.status(CONFLICT).json({ message });
    }
    response.status(ERROR).json({ message: error.message });
  }
};

const getAll = async (request, response) => {
    try {
        const all = await userService.getAll();
        return response.status(OK).json(all);
    } catch (error) {
        response.status(ERROR).json({ message: error.message }); 
    }
};

const getByPk = async (request, response) => {
    try {
        const { id } = request.params;
        const user = await userService.getByPk(id);
        return response.status(OK).json(user);
    } catch (error) {
        const MESSAGE = 'User does not exist';
        response.status(NOT_F).json({ message: MESSAGE });
    }
};

const remove = async (request, response) => {
    try {
        const { id } = request.params;
        await userService.remove(id);
        return response.status(OK).json();
    } catch (error) {
        response.status(ERROR).json({ message: error.message });
    }
};

module.exports = {
  userCreate,
  getAll,
  getByPk,
  remove,
};
