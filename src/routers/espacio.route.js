const express = require("express");
const route = express.Router();
const espacioController = require("../controllers/espacio.controller");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // asegúrate de tener esta carpeta o créala
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

route
  .get("/plantilla-excel", espacioController.downloadTemplate)
  .get("/", espacioController.get)
   .get("/filtro", espacioController.getByFilters)
  .get("/:id", espacioController.getById)
 
  .post("/importar", upload.single("file"), espacioController.importFromExcel)
  .post("/", espacioController.create)
  .put("/:id", espacioController.update)
  .delete("/:id", espacioController._delete);

module.exports = route;
