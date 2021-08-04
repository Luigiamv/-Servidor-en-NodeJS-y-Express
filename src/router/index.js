const express = require('express');
const router = express.Router();
const controlador = require('../controller/controller');
const { multerMiddleware } = require('../utils/multer');
router.get('/', controlador.home);
router.get('/nueva-noticia', controlador.crearNoticia);
router.get('/nueva-categoria', controlador.crearCategoria);
router.get('/nuevo-autor', controlador.crearAutor);
router.post('/crear-categoria', controlador.postCrearCategoria);
router.post('/crear-autor', controlador.postCrearAutor);
router.post(
  '/crear-noticia',
  multerMiddleware.single('imagen'),
  controlador.postCrearNoticia
);
router.get('/noticia/:slug', controlador.noticiaSlug);
router.use('/noticia-eliminar/:id', controlador.deleteNoticiaEliminar);
router.get('/noticia-editar/:id', controlador.noticiaEditar);
router.post('/actualizar-noticia/:id', controlador.putNoticiaActualizar);
router.get('/categorias', controlador.listarCategorias);
router.get('/autores', controlador.listarAutores);
router.use('/categoria-eliminar/:id', controlador.eliminarCategoria);
router.use('/autor-eliminar/:id', controlador.eliminarAutor);

module.exports = router;
