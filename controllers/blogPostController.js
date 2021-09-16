const blogPostService = require('../services/blogPostService');

const OK = 200;
const CREATE = 201;
const DELETE = 204;
const ERROR = 400;
const NOT_AUTH = 401;
const NOT_F = 404;

const blogPostCreate = async (request, response) => {
  try {
    const { title, content, categoryIds } = request.body;
    const token = request.headers.authorization;
    const result = await blogPostService.createBlogPost(
      title, content, categoryIds, token,
);
    return response.status(CREATE).json(result);
  } catch (error) {
    response.status(ERROR).json({ message: error.message });
  }
};

const getAll = async (request, response) => {
    try {
      console.log('passou pelo controler');
        const all = await blogPostService.getAll();
        return response.status(OK).json(all);
    } catch (error) {
        response.status(ERROR).json({ message: error.message }); 
    }
};

const getByPk = async (request, response) => {
    try {
        const { id } = request.params;
        const user = await blogPostService.getByPk(id);
        return response.status(OK).json(user);
    } catch (error) {
        const MESSAGE = 'Post does not exist';
        response.status(NOT_F).json({ message: MESSAGE });
    }
};

const remove = async (request, response) => {
    try {
        const { id } = request.params;
        const token = request.headers.authorization;
        await blogPostService.remove(id, token);
        return response.status(DELETE).json();
    } catch (error) {
      if (error.message === 'Post does not exist') {
        return response.status(NOT_F).json({ message: error.message }); 
}
        response.status(NOT_AUTH).json({ message: error.message });
    }
};

const update = async (request, response) => {
  try {
    const { id } = request.params;
    const token = request.headers.authorization;
    const { title, content, categoryIds } = request.body;
    const result = await blogPostService.update({ id, title, content, categoryIds, token });
    return response.status(OK).json(result);
} catch (error) {
  if (error.message === 'Unauthorized user') {
    return response.status(NOT_AUTH).json({ message: error.message });
  }
    response.status(ERROR).json({ message: error.message });
}
};

module.exports = {
  blogPostCreate,
  getAll,
  getByPk,
  remove,
  update,
};