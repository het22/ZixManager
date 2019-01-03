const Router = require('koa-router');
const router = new Router({
  prefix: '/cost'
});
const dbpool = require('../db/dbpool.js');

const costTableNames = [
  'wallpaper',
  'plate',
  'labor',
  'subsidary'
];
const costPrefix = [
  'wlp',
  'plt',
  'lab',
  'sbd'
];

// 전체 가격정보 요청 처리
router.get(`/`, async (ctx, next) => {
  console.log(`koa-router: client(ip: ${ctx.request.ip}) request.(${ctx.request.url})`);
  let costs = {};
  for (i in costTableNames) {
    let tableName = costTableNames[i];
    let prefix = costPrefix[i];
    let query = `SELECT * FROM zix.${tableName}_cost`;
    costs[prefix+'_cost'] = await dbpool.fetch(query);
  }
  ctx.body = costs;
});

// 개별 가격정보에 대한 처리
for (i in costTableNames) {
  let tableName = costTableNames[i];
  let prefix = costPrefix[i];

  // 가격정보 요청 처리
  router.get(`/${prefix}`, async (ctx, next) => {
    console.log(`koa-router: client(ip: ${ctx.request.ip}) request.(${ctx.request.url})`);
    let query = `SELECT * FROM zix.${tableName}_cost`;
    ctx.body = await dbpool.fetch(query)
  });

  // 가격정보 수정요청 처리
  router.post(`/${prefix}/save`, async (ctx, next) => {
    console.log(`koa-router: client(ip: ${ctx.request.ip}) request.(${ctx.request.url})`);
    let costs = ctx.request.body;
    var success = true;
    costs.forEach(async (cost) => {
      var query =
        `UPDATE zix.${tableName}_cost SET
        rtl_cost = ?,
        spl_cost = ?
        WHERE ${prefix}_id = ?;`;
      var elements = [cost.rtl_cost, cost.spl_cost, cost[`${prefix}_id`]];
      success = success && await dbpool.fetch(query, elements);
    });
    ctx.body = success;
  });
}

module.exports = router;
