const mongoose = require('mongoose');

const SchemaCategoria = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  editorial: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Categoria', SchemaCategoria);
