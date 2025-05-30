const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const routeApi = require("./routers");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Port ==>", port);
});

routeApi(app);