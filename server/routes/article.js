const Router = require('koa-router');
const router = new Router({
  prefix: '/article'
});
const dbpool = require('../dbpool.js');

router.get('/customer', async (ctx, next) => {
  const client = ctx.request.ip;
  console.log("server: client request.("+client+" /customer)");
  ctx.body = await fetch('SELECT * FROM customer')
});

router.get('/customer/:id', async (ctx, next) => {
  const id = ctx.params.id;
  const client = ctx.request.ip;
  console.log("server: client request.("+client+" /customer/"+id+")");
  ctx.body = await fetch('SELECT * FROM customer WHERE id='+id+'')
});

async function fetch(query) {
  // try database connection
  try {
    const connection = await dbpool.getConnection(async conn => conn);
    // try query
    try {
      const res = await connection.query(query);
      connection.release();
      // check query result
      if (res[0].length == 0) {
        console.log('db: query result is empty.');
        return false;
      } else {
        console.log('db: query result is returned.');
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
