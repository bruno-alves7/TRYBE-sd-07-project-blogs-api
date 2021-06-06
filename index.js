const express = require('express');
require('dotenv').config();

const user = require('./routes/userRoute');
const login = require('./routes/loginRoute');
const categories = require('./routes/categorieRoute');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/user', user);
app.use('/login', login);
app.use('/categories', categories);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
