const Router = require('koa-router');
const router = new Router({
  prefix: '/order'
});
const dbpool = require('../dbpool.js');

// 전체주문정보 페이지 - 테이블에 보여줄 주문 정보들
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

// 상세주문정보 페이지 - 주문의 모든 정보 쿼리
router.get('/:id', async (ctx, next) => {
  let client = ctx.request.ip;
  let id = ctx.params.id;
  console.log(`koa-router: client(${client}) request.(/order/${id})`);
  let query =
    `SELECT *
    FROM zix.order AS o
    JOIN (SELECT mem_id, mem_username, mem_userid FROM zix.member) AS m
    WHERE o.mem_id = m.mem_id AND o.ord_id = ?`;
  ctx.body = await dbpool.fetch(query, id);
});

module.exports = router;
