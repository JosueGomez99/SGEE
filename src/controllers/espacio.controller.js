const espacioServices = require("../services/espacio.services");
const service = new espacioServices();
const path = require('path');
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
const importFromExcel = async (req, res) => {
  try {
    const filePath = req.file.path;
    const result = await service.ImportFromExcel(filePath);
    res.json(result);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};


const downloadTemplate = (req, res) => {
  const filePath = service.generateExcelTemplate(); 
  res.download(filePath, 'plantilla_espacios.xlsx', (err) => {
    if (err) {
      res.status(500).send({ success: false, message: 'No se pudo descargar la plantilla' });
    }
  });
};

const getByFilters = async (req, res) => {
  try {
    const query = req.query.query;

    if (!query || typeof query !== "string" || query.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "No se recibió texto para filtrar" });
    }

    const response = await service.findByFilters(query.trim()); 
   res.json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
  
};

module.exports = {
  create,
  get,
  getById,
  update,
  _delete,
  importFromExcel,
  downloadTemplate,
  getByFilters,
};
