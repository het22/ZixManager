const Router = require('koa-router');
const router = new Router({
  prefix: '/order'
});
const dbpool = require('../dbpool.js');

// 전체 주문 요청
router.get('/', async (ctx, next) => {
  const client = ctx.request.ip;
  console.log("server: client request.(" + client + " /order)");
  ctx.body = await dbpool.fetch('SELECT * FROM zix.order')
});

// 주문아이디로 주문 요청
router.get('/:id', async (ctx, next) => {
  const id = ctx.params.id;
  const client = ctx.request.ip;
  console.log("server: client request.(" + client + " /order/" + id + ")");
  ctx.body = await dbpool.fetch('SELECT * FROM zix.order WHERE odr_id=' + id + '');
});

module.exports = router;
