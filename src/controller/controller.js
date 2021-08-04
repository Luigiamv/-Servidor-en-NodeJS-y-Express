const modeloNoticia = require('../models/Noticias');
const modeloAutores = require('../models/Autores');
const modeloCategoria = require('../models/Categorias');
class Controlador {
  async home(req, res) {
    let noticias = await modeloNoticia
      .find()
      .sort({ fecha: 'desc' })
      .populate('autor')
      .populate('categoria');
    try {
      if (!noticias.length) {
        res.render('screen/index', {
          noticias,
        });
        return;
      }
      res.render('screen/index', {
        noticias,
      });
    } catch (error) {
      res.render('screen/index', {
        noticias,
        error: 'Ocurrió un error con las noticias',
      });
    }
  }
  async noticiaSlug(req, res) {
    const { slug } = req.params;
    let noticiaDetalle = await modeloNoticia
      .findOne({ slug })
      .populate('autor')
      .populate('categoria');
    if (!noticiaDetalle) {
      res.render('screen/noticiaSlug', {
        noticiaDetalle,
      });
      return;
    }
    res.render('screen/noticiaSlug', {
      noticiaDetalle,
    });
  }
  async crearNoticia(req, res) {
    const autores = await modeloAutores.find();
    const categorias = await modeloCategoria.find();
    res.render('screen/crearNoticia', { autores, categorias });
  }
  crearCategoria(req, res) {
    res.render('screen/crearCategoria');
  }
  crearAutor(req, res) {
    res.render('screen/crearAutor');
  }
  async postCrearCategoria(req, res) {
    const { nombre, editorial } = req.body;
    const categoria = { nombre, editorial };
    try {
      await modeloCategoria.create(categoria);
      res.render('screen/crearCategoria', {
        msg: 'Categoría creada correctamente',
      });
    } catch (e) {
      res.render('screen/crearCategoria', {
        error: `Ha ocurrido un error: ${e}`,
      });
    }
  }
  async postCrearAutor(req, res) {
    const { nombre, apellido, edad, genero, pais } = req.body;
    const autorDatos = { nombre, apellido, edad, genero, pais };
    try {
      await modeloAutores.create(autorDatos);
      res.render('screen/crearAutor', {
        msg: 'Autor creado correctamente',
      });
    } catch (e) {
      res.render('screen/crearAutor', {
        error: `Ha ocurrido un error: ${e}`,
      });
    }
  }
  async noticiaEditar(req, res) {
    const { id } = req.params;
    const noticia = await modeloNoticia.findById({ _id: id });
    const autores = await modeloAutores.find();
    const categorias = await modeloCategoria.find();
    if (!noticia) {
      res.render('screen/noticiaEditar', {
        noticia,
        autores,
        categorias,
      });
      return;
    }
    res.render('screen/noticiaEditar', {
      noticia,
      autores,
      categorias,
    });
  }
  async deleteNoticiaEliminar(req, res) {
    const { id } = req.params;
    await modeloNoticia.findByIdAndDelete({ _id: id });
    const noticias = await modeloNoticia.find();
    res.render('screen/index', { noticias, msg: 'Eliminado correctamente' });
  }
  async postCrearNoticia(req, res) {
    const autores = await modeloAutores.find();
    const categorias = await modeloCategoria.find();
    try {
      const { titulo, descripcion, subtitulo, categoria, autor, fecha } =
        req.body;
      const imagen = req.file.filename;
      await modeloNoticia.create({
        titulo,
        descripcion,
        subtitulo,
        categoria,
        autor,
        fecha,
        imagen,
      });

      res.render('screen/crearNoticia', {
        msg: 'Noticia creada correctamente',
        autores,
        categorias,
      });
    } catch (error) {
      res.render('screen/crearNoticia', {
        error: `Algo ha salido mal creando la noticia: ${error}`,
        autores,
        categorias,
      });
    }
  }
  async putNoticiaActualizar(req, res) {
    const { id } = req.params;
    const { titulo, descripcion, subtitulo, categoria, autor, fecha } =
      req.body;
    try {
      await modeloNoticia.findByIdAndUpdate(
        { _id: id },
        { titulo, descripcion, subtitulo, categoria, autor, fecha }
      );
      const noticias = await modeloNoticia
        .find()
        .sort({ fecha: 'desc' })
        .populate('autor')
        .populate('categoria');

      res.render('screen/index', {
        msg: 'Noticia actualizada correctamente',
        noticias,
      });
    } catch (e) {
      const noticias = await modeloNoticia
        .find()
        .sort({ fecha: 'desc' })
        .populate('autor')
        .populate('categoria');
      res.render('screen/index', {
        msg: `Ha ocurrido un error actualizando la noticia: ${e}`,
        noticias,
      });
    }
  }
  async listarCategorias(req, res) {
    const categorias = await modeloCategoria.find();
    try {
      res.render('screen/categorias', {
        categorias,
      });
    } catch (error) {
      res.render('screen/categorias', {
        categorias,
        error: `Ocurrio un error: ${error}`,
      });
    }
  }
  async listarAutores(req, res) {
    const autores = await modeloAutores.find();
    try {
      res.render('screen/autores', {
        autores,
      });
    } catch (error) {
      res.render('screen/autores', {
        autores,
        error: `Ocurrio un error: ${error}`,
      });
    }
  }
  async eliminarCategoria(req, res) {
    const { id } = req.params;
    await modeloCategoria.findByIdAndDelete({ _id: id });
    const categorias = await modeloCategoria.find();

    try {
      res.render('screen/categorias', {
        categorias,
        msg: 'Categoría eliminada correctamente',
      });
    } catch (error) {
      res.render('screen/categorias', {
        categorias,
        error: `Ocurrio un error eliminando la categoría: ${error}`,
      });
    }
  }
  async eliminarAutor(req, res) {
    const { id } = req.params;
    await modeloAutores.findByIdAndDelete({ _id: id });
    const autores = await modeloAutores.find();

    try {
      res.render('screen/autores', {
        autores,
        msg: 'Autor eliminado correctamente',
      });
    } catch (error) {
      res.render('screen/autores', {
        autores,
        error: `Ocurrio un error eliminando el autor: ${error}`,
      });
    }
  }
}
module.exports = new Controlador();
