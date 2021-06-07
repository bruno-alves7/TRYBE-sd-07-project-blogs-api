const definePostsCategoriesModel = (sequelize, DataTypes) => {
  const PostsCategories = sequelize.define('PostsCategories', {}, { timestamps: false });

  PostsCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categories',
      through: PostsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'blogPost',
      through: PostsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostsCategories;
};

module.exports = definePostsCategoriesModel;