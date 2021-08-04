const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
const BD = require('./database/index');
const router = require('./router/index');
dotenv.config();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + '/public')));
app.use(morgan('dev'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'view'));
app.use(router);
app.listen(port, async () => {
  console.log(`Servidor escuchando en el puerto: ${port}`);
  try {
    await BD.connectWithMongo();
  } catch (error) {
    console.error(error);
  }
});
