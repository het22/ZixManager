const Router = require('koa-router');
const router = new Router({
  prefix: '/cost'
});
const dbpool = require('../dbpool.js');

const costTableNames = [
  'wallpaper_cost',
  'plate_cost',
  'labor_cost',
  'subsidary_cost'];

costTableNames.forEach((costTableName) => {
  //가격정보요청
  router.get(`/${costTableName}`, async (ctx, next) => {
    const client = ctx.request.ip;
    console.log(`koa-router: client(${client}) request.(/cost/${costTableName})`);
    const query = `SELECT * FROM zix.${costTableName}`;
    ctx.body = await dbpool.fetch(query)
  });
});

// 벽지가격정보 수정 요청
router.post('/wallpaper_cost/save', async (ctx, next) => {
  const client = ctx.request.ip;
  const costs = ctx.request.body;
  console.log(`koa-router: client(${client}) request.(/cost/wallpaper_cost/save)`);
  var success = true;
  costs.forEach(async (cost) => {
    var query =
      `UPDATE zix.wallpaper_cost SET
      wlp_rtl_cost = ${cost.wlp_rtl_cost},
      wlp_spl_cost = ${cost.wlp_spl_cost}
      WHERE wlp_id = ${cost.wlp_id};`;
    success = success && await dbpool.fetch(query);
  });
  ctx.body = success;
});

// 장판가격정보 수정 요청
router.post('/plate_cost/save', async (ctx, next) => {
  const client = ctx.request.ip;
  const costs = ctx.request.body;
  console.log(`koa-router: client(${client}) request.(/cost/plate_cost/save)`);
  var success = true;
  costs.forEach(async (cost) => {
    var query =
      `UPDATE zix.plate_cost SET
      plt_rtl_cost = ${cost.plt_rtl_cost},
      plt_spl_cost = ${cost.plt_spl_cost}
      WHERE plt_id = ${cost.plt_id};`;
      success = success && await dbpool.fetch(query);
  });
  ctx.body = success;
});

// 인건비 수정 요청
router.post('/labor_cost/save', async (ctx, next) => {
  const client = ctx.request.ip;
  const costs = ctx.request.body;
  console.log(`koa-router: client(${client}) request.(/cost/labor_cost/save)`);
  var success = true;
  costs.forEach(async (cost) => {
    var query =
      `UPDATE zix.labor_cost SET
      lab_rtl_cost = ${cost.lab_rtl_cost},
      lab_spl_cost = ${cost.lab_spl_cost}
      WHERE lab_id = ${cost.lab_id};`;
      success = success && await dbpool.fetch(query);
  });
  ctx.body = success;
});

// 부자재비 수정 요청
router.post('/subsidary_cost/save', async (ctx, next) => {
  const client = ctx.request.ip;
  const costs = ctx.request.body;
  console.log(`koa-router: client(${client}) request.(/cost/subsidary_cost/save)`);
  var success = true;
  costs.forEach(async (cost) => {
    var query =
      `UPDATE zix.subsidary_cost SET
      sbd_rtl_cost = ${cost.sbd_rtl_cost},
      sbd_spl_cost = ${cost.sbd_spl_cost}
      WHERE sbd_id = ${cost.sbd_id};`;
      success = success && await dbpool.fetch(query);
  });
  ctx.body = success;
});

module.exports = router;
