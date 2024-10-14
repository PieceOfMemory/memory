const mysql = require("mysql2/promise");
//const pw = require("./secret.json");

const db = mysql.createPool({
    host: "memorydb.ct8ok6wguoto.ap-northeast-2.rds.amazonaws.com",
    user: "wngml",
    password: "admin1234",
    database: 'memoryrds'
});

module.exports = db;