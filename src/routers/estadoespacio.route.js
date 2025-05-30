const express=require('express');
const route = express.Router();
const estadoespacioController = require('../controllers/estadoespacio.controller');

route
    .get('/',estadoespacioController.get)
    .get('/:id',estadoespacioController.getById)
    .post('/',estadoespacioController.create)
    .put('/:id',estadoespacioController.update)
    .delete('/:id',estadoespacioController._delete);

module.exports=route;