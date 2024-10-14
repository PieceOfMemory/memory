const mysql = require("mysql2/promise");
//const pw = require("./secret.json");
require('dotenv').config();

const db = mysql.createPool({
    hhost: process.env.DB_HOST,  
    user: process.env.DB_USER,      
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME  
});

module.exports = db;