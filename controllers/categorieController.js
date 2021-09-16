const categorieService = require('../services/categorieService');

const OK = 200;
const CREATE = 201;
const ERROR = 400;

const categorieCreate = async (request, response) => {
  try {
    const { name } = request.body;
    const categorie = await categorieService.createCategorie(name);
    return response.status(CREATE).json(categorie);
  } catch (error) {
    response.status(ERROR).json({ message: error.message });
  }
};

const getAll = async (request, response) => {
    try {
        const all = await categorieService.getAll();
        return response.status(OK).json(all);
    } catch (error) {
        response.status(ERROR).json({ message: error.message }); 
    }
};

module.exports = {
  categorieCreate,
  getAll,
};
