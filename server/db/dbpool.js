const mysql = require('mysql2/promise');
var dbconfig = {
  host: 'localhost',
  user: 'root',
  password: '111111',
  database: 'zix',
  dateStrings: true
};
var dbpool = mysql.createPool(dbconfig);

/*

축약어 정리
adr - address
wlp - wallpaper
plt - plate
spl - supply
rtl - retail

*/

exports.fetch = async (query, elements) => {
  // try database connection
  try {
    const connection = await dbpool.getConnection(async conn => conn);
    // try query
    try {
      const res = await connection.query(query, elements);
      connection.release();
      // check query result
      if (res[0].length == 0) {
        console.log('mysql: query result is empty.');
        return false;
      } else {
        console.log('mysql: query result is successfully returned!');
        return res[0];
      }
    } catch (err) {
      console.log('mysql: query error(' + err + ')');
      return false;
    }
  } catch (err) {
    console.log('mysql: connection error(' + err + ')');
    return false;
  }
}
