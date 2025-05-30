const Services = require("../services/asignacioninstitucionespacio.services");
const service = new Services();
const create = async (req, res) => {
  try {
    const response = await service.create(req.body);
    res.json({ success: true, data: response });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const get = async (req, res) => {
  try {
    const response = await service.find();
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.findOne(id);
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const response = await service.update(id, body);
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
const _delete = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
const asignarEspacios = async (req, res) => {
  try {
    const { id } = req.params; 
    const { espaciosAsignadosIds } = req.body;

    const response = await service.asignarEspaciosAInstitucion(id, espaciosAsignadosIds);
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
module.exports = {
  create,
  get,
  getById,
  update,
  _delete,
  asignarEspacios,

};
