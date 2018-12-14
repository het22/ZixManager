const Router = require('koa-router');
const router = new Router({
  prefix: '/cost'
});
const dbpool = require('../dbpool.js');

// 벽지가격정보 요청
router.get('/wallpaper_cost', async (ctx, next) => {
  const client = ctx.request.ip;
  console.log(`koa-router: client(${client}) request.(/cost/wallpaper_cost)`);
  const query = `SELECT * FROM zix.wallpaper_cost`;
  ctx.body = await dbpool.fetch(query)
});

// 장판가격정보 요청
router.get('/plate_cost', async (ctx, next) => {
  const client = ctx.request.ip;
  console.log(`koa-router: client(${client}) request.(/cost/plate_cost)`);
  const query = `SELECT * FROM zix.plate_cost`;
  ctx.body = await dbpool.fetch(query)
});

// 벽지가격정보 수정 요청
router.post('/wallpaper_cost/save', async (ctx, next) => {
  const client = ctx.request.ip;
  const wallpaper_cost = ctx.request.body;
  console.log(`koa-router: client(${client}) request.(/cost/wallpaper_cost/save)`);
  var success = true;
  for (cost in wallpaper_cost) {
    var query = `UPDATE zix.wallpaper_cost SET
      wlp_rtl_cost = ${wallpaper_cost[cost].wlp_rtl_cost},
      wlp_spl_cost = ${wallpaper_cost[cost].wlp_spl_cost}
      WHERE wlp_id = ${wallpaper_cost[cost].wlp_id};`
    success = success && await dbpool.fetch(query)
  }
  ctx.body = success;
});

// 장판가격정보 수정 요청
router.post('/plate_cost/save', async (ctx, next) => {
  const client = ctx.request.ip;
  const plate_cost = ctx.request.body;
  console.log(`koa-router: client(${client}) request.(/cost/plate_cost/save)`);
  var success = true;
  for (cost in plate_cost) {
    var query = `UPDATE zix.plate_cost SET
      plt_rtl_cost = ${plate_cost[cost].plt_rtl_cost},
      plt_spl_cost = ${plate_cost[cost].plt_spl_cost}
      WHERE plt_id = ${plate_cost[cost].plt_id};`
    success = success && await dbpool.fetch(query)
  }
  ctx.body = success;
});

module.exports = router;
