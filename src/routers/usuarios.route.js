const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');

router.get('/', usuariosController.getUsuarios);
router.post('/', usuariosController.createUsuario);
router.delete('/:id', usuariosController.deleteUsuario);

module.exports = router;
