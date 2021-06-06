const { Categorie } = require('../models');

const validateName = (name) => {
    if (!name) {
        const ERR_NAME = '"name" is required';
      throw new Error(ERR_NAME);
    }
    return name;
};

const createCategorie = async (name) => {
    validateName(name);
    const result = await Categorie.create({ name });
    return result;
};

const getAll = async () => {
    try {
        const all = await Categorie.findAll();
        return all;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    createCategorie,
    getAll,
};
