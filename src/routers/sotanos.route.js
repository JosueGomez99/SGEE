const express=require('express');
const route = express.Router();
const sotanosController = require('../controllers/sotanos.controller');

route
    .get('/',sotanosController.get)
    .get('/:id',sotanosController.getById)
    .post('/',sotanosController.create)
    .put('/:id',sotanosController.update)
    .delete('/:id',sotanosController._delete);

module.exports=route;