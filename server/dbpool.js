const mysql = require('mysql2/promise');
var dbconfig = {
  host: 'localhost',
  user: 'root',
  password: '111111',
  database: 'zix'
};
var dbpool = mysql.createPool(dbconfig);

module.exports = dbpool;
