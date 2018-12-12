const mysql = require('mysql2/promise');
var dbconfig = {
  host: 'localhost',
  user: 'root',
  password: '111111',
  database: 'zix',
  dateStrings: true
};
var dbpool = mysql.createPool(dbconfig);

module.exports = dbpool;
