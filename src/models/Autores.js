const mongoose = require('mongoose');

const SchemaAutor = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  edad: {
    type: String,
    required: true,
  },
  genero: {
    type: String,
    required: true,
  },
  pais: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Autor', SchemaAutor);
