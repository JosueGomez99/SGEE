const express=require('express');
const route = express.Router();
const institucionController = require('../controllers/institucion.controller');
route
   
    .get('/',institucionController.get)
    .get('/:id',institucionController.getById)
    .post('/',institucionController.create)
    .put('/:id',institucionController.update)
    .delete('/:id',institucionController._delete);

module.exports=route;