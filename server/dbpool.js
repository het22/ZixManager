const mysql = require('mysql2/promise');
var dbconfig = {
  host: 'localhost',
  user: 'root',
  password: '111111',
  database: 'zix',
  dateStrings: true
};
var dbpool = mysql.createPool(dbconfig);

exports.fetch = async (query, elements) => {
  // try database connection
  try {
    console.log('mysql: try get connection from pool...');
    const connection = await dbpool.getConnection(async conn => conn);
    // try query
    try {
      console.log('mysql: success getting connection from pool!');
      console.log('mysql: try query...');
      const res = await connection.query(query, elements);
      connection.release();
      console.log('mysql: connection released.');
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
