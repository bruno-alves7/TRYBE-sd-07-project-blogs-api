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

// const remove = async (id) => {
//     try {
//         const user = await BlogPost.destroy({ where: { id } });
//         return user;
//     } catch (error) {
//         throw new Error(error);
//     }
// };

module.exports = {
  createBlogPost,
  getAll,
  getByPk,
  // remove,
};