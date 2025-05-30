const express=require('express');
const route = express.Router();
const tipoespacioController = require('../controllers/tipoespacio.controller');
route
    .get('/',tipoespacioController.get)
    .get('/:id',tipoespacioController.getById)
    .post('/',tipoespacioController.create)
    .put('/:id',tipoespacioController.update)
    .delete('/:id',tipoespacioController._delete);

module.exports=route;