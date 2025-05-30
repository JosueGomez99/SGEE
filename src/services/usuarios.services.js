const { Usuario } = require('../models/usuarios.model');

exports.getUsuarios = async () => {
  return await Usuario.findAll();
};

exports.createUsuario = async (data) => {
  return await Usuario.create(data);
};

exports.deleteUsuario = async (id) => {
  return await Usuario.destroy({ where: { id } });
};
