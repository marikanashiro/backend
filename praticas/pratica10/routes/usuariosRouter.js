const express = require("express");
const usuariosController = require('../controllers/usuariosController');
const { verificarToken } = require('../middlewares/authMiddleware');

const usuariosRouter = express.Router();

usuariosRouter.post('/', usuariosController.criar);
usuariosRouter.post('/login', usuariosController.entrar);
usuariosRouter.post('/renovar', verificarToken, usuariosController.renovar);
usuariosRouter.delete('/:id', verificarToken, usuariosController.remover);

module.exports = usuariosRouter;