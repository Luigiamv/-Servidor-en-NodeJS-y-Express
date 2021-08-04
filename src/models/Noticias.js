const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);
const ShemaNoticia = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  subtitulo: {
    type: String,
    required: true,
  },
  autor: {
    type: mongoose.Types.ObjectId,
    ref: 'Autor',
    required: true,
  },
  categoria: {
    type: mongoose.Types.ObjectId,
    ref: 'Categoria',
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: () => Date.now(),
  },
  imagen: {
    type: String,
    required: true,
  },
  slug: { type: String, slug: 'titulo', unique: true, slug_padding_size: 2 },
});

module.exports = mongoose.model('Noticia', ShemaNoticia);
