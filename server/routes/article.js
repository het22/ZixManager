const Router = require('koa-router');
const router = new Router({
  prefix: '/article'
});
const dbpool = require('../dbpool.js');

router.get('/client', async (ctx, next) => {
  const name = ctx.query.name;
  const client = ctx.request.ip;
  console.log("server: client("+client+") request.(name:" + name + ")");
  ctx.body = await dbtest(name);
});

const dbtest = async (name) => {
  // try database connection
  try {
    const connection = await dbpool.getConnection(async conn => conn);
    // try query
    try {
      const query = 'SELECT * FROM privacy\
                    WHERE name=\'' + name + '\'';
      const res = await connection.query(query);
      connection.release();
      // check query result
      if (res[0].length == 0) {
        console.log('db: query result is empty.');
        return false;
      } else {
        console.log('db: query result is returned.');
        return res[0][0];
      }
    } catch (err) {
      console.log('db: query error(' + err + ')');
      return false;
    }
  } catch (err) {
    console.log('db: connection error(' + err + ')');
    return false;
  }
}

module.exports = router;
