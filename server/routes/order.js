const Router = require('koa-router');
const router = new Router({
  prefix: '/order'
});
const dbpool = require('../dbpool.js');

// 전체 주문정보 요청
router.get('/', async (ctx, next) => {
  const client = ctx.request.ip;
  console.log(`koa-router: client(${client}) request.(/order)`);
  const query =
  `SELECT *
  FROM zix.order AS o
  JOIN (SELECT mem_id, mem_username FROM zix.member) AS m
  WHERE o.mem_id = m.mem_id`;
  ctx.body = await dbpool.fetch(query)
});

module.exports = router;
