const express = require('express');
require('dotenv').config();
const mysql = require('mysql2');
const routeApi = require('../routers')


//variables de configuración
const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbUser:  process.env.DB_USER,
  dbPassword:  process.env.DB_PASSWORD,
  dbHost:  process.env.DB_HOST,
  dbName:  process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  
};



module.exports= {config};

