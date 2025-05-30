const express=require('express');
const route = express.Router();
const funcionariosController = require('../controllers/funcionarios.controller');

route
    .get('/',funcionariosController.get)
    .get('/:id',funcionariosController.getById)
    .post('/',funcionariosController.create)
    .put('/:id',funcionariosController.update)
    .delete('/:id',funcionariosController._delete);

module.exports=route;