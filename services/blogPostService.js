const jwt = require('jsonwebtoken');
const { BlogPost, Categorie, User } = require('../models');
require('dotenv/config');

const validateTitle = (title) => {
  if (!title) {
      const ERR = '"title" is required';
    throw new Error(ERR);
  }
  return title;
};

const validateContent = (content) => {
    if (!content) {
        const ERR = '"content" is required';
      throw new Error(ERR);
    }
    return content;
  };

const categoryIdExist = (categoryIds) => {
    if (!categoryIds) {
        const ERR = '"categoryIds" is required';
      throw new Error(ERR);
    }
};

const validateCategoryId = async (categoryIds) => {
  const result = await Categorie.findAndCountAll({
    where: { id: categoryIds } });
    console.log('categoryIds', categoryIds);
    console.log('result', result.count);
  if (!result.count) {
    const ERR_EMAIL = '"categoryIds" not found';
    throw new Error(ERR_EMAIL);
  }
};

const decoded = async (token) => {
    const newSecret = process.env.JWT_SECRET;
    const result = jwt.verify(token, newSecret);
    const { id: userId } = await User.findOne({ where: { email: result.email } });
    return userId;
};

const createBlogPost = async (title, content, categoryIds, token) => {
  validateTitle(title);
  validateContent(content);
  categoryIdExist(categoryIds);
  await validateCategoryId(categoryIds);
  const userId = await decoded(token);
  const result = await BlogPost.create({ title, content, userId });
  
  console.log(token);
  return result;
};

const getAll = async () => {
    try {
        console.log('chegou no service');
        const all = await BlogPost.findAll({
            include: [
              { model: User,
as: 'user',
attributes: { exclude: 
                ['password', 'createdAt', 'updatedAt'] } },
              { model: Categorie, as: 'categories', through: { attributes: [] } },
            ],
          });
          return all;
    } catch (error) {
        throw new Error(error);
    }
};

const getByPk = async (id) => {
    try {
        const user = await BlogPost.findByPk(id, {
            include: [
                { model: User,
  as: 'user',
  attributes: { exclude: 
                  ['password', 'createdAt', 'updatedAt'] } },
                { model: Categorie, as: 'categories', through: { attributes: [] } },
              ],
        });
        if (user === null) {
            throw new Error();
        }
        return user;
    } catch (error) {
        throw new Error(error);
    }
};

const validateCategoryIdNull = (categoryId) => {
  if (categoryId) {
    const ERR = 'Categories cannot be edited';
  throw new Error(ERR);
}
return categoryId;
};

const validateId = async (token, id) => {
  const idUserToken = await decoded(token);
  const post = await BlogPost.findByPk(id);
  if (idUserToken !== post.userId) {
    const ERR = 'Unauthorized user';
    throw new Error(ERR);
  }
  return 'Unauthorized user';
};

const update = async ({ id, title, content, categoryIds, token }) => {
  validateCategoryIdNull(categoryIds);
  validateTitle(title);
  validateContent(content);
  await validateId(token, id);
  try {
      await BlogPost.update({ title, content }, { where: { id } });
      const result = await BlogPost.findByPk(id, { attributes: 
        { exclude: ['id', 'published', 'updated'] },
        include: [
            { model: Categorie, as: 'categories', through: { attributes: [] } }],
    }); 
      return result;
  } catch (error) {
      throw new Error(error);
  }
};

const postExists = async (id) => {
  const result = await BlogPost.findByPk(id);
  if (!result) {
    const ERR = 'Post does not exist';
    throw new Error(ERR);
  }
};

const remove = async (id, token) => {
  await postExists(id);
  await validateId(token, id);
  try {
      const post = await BlogPost.destroy({ where: { id } });
      return post;
  } catch (error) {
      throw new Error(error);
  }
};

module.exports = {
  createBlogPost,
  getAll,
  getByPk,
  remove,
  update,
};