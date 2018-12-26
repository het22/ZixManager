const Router = require('koa-router');
const router = new Router({
  prefix: '/schedule'
});
const dbpool = require('../db/dbpool.js');

//
router.get('/', async (ctx, next) => {
  console.log(`koa-router: client(ip: ${ctx.request.ip}) request.(${ctx.request.url})`);
  let query =
  `SELECT *
  FROM (SELECT ord_id, mem_id, ord_date_consult, ord_date_construct FROM zix.order) AS o
  JOIN (SELECT mem_id, mem_username, mem_userid, mem_phone FROM zix.member) AS m
  WHERE o.mem_id = m.mem_id`;
  ctx.body = await dbpool.fetch(query)
});

module.exports = router;
