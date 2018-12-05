const Router = require('koa-router');
const router = new Router({
  prefix: '/article'
});
const dbpool = require('../dbpool.js');

router.get('/customer', async (ctx, next) => {
  const name = ctx.query.name;
  const client = ctx.request.ip;
  console.log("server: client("+client+") request.(customer_all)");
  ctx.body = await request_customer_all();
});

const request_customer_all = async () => {
  // try database connection
  try {
    const connection = await dbpool.getConnection(async conn => conn);
    // try query
    try {
      const query = 'SELECT * FROM customer';
      const res = await connection.query(query);
      connection.release();
      // check query result
      if (res[0].length == 0) {
        console.log('db: query result is empty.');
        return false;
      } else {
        console.log('db: query result(request_customer_all) is returned.');
        return res[0];
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
