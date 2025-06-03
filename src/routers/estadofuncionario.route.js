const express = require('express');
const route = express.Router();
const estadoFuncionarioController = require('../controllers/estadofuncionario.controller');

route
    .get('/', estadoFuncionarioController.get)
    .get('/:id', estadoFuncionarioController.getById)
    .post('/', estadoFuncionarioController.create)
    .put('/:id', estadoFuncionarioController.update)
    .delete('/:id', estadoFuncionarioController._delete);

module.exports = route;
