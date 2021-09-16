const loginService = require('../services/loginService');

const OK = 200;
const ERROR = 400;

const login = async (request, response) => {
    const { email, password } = request.body;
    try {
        const token = await loginService.login(
            email, password,
      );
          return response.status(OK).json({ token });
    } catch (error) {
        response.status(ERROR).json({ message: error.message });
    }
};

module.exports = {
    login,
};
