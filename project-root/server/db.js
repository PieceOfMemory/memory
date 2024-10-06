const mysql = require("mysql2/promise");
const pw = require("./secret.json");

const db = mysql.createPool({
    host: pw.host,
    user: pw.user,
    password: pw.password,
    database: 'memoryrds'
});

module.exports = db;