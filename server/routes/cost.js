const Router = require('koa-router');
const router = new Router({
  prefix: '/cost'
});
const dbpool = require('../dbpool.js');

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

for (i in costTableNames) {
  let tableName = costTableNames[i];
  let prefix = costPrefix[i];

  // 가격정보 요청 처리
  router.get(`/${tableName}`, async (ctx, next) => {
    const client = ctx.request.ip;
    console.log(`koa-router: client(${client}) request.(/cost/${tableName})`);
    const query = `SELECT * FROM zix.${tableName}_cost`;
    ctx.body = await dbpool.fetch(query)
  });

  // 가격정보 수정요청 처리
  router.post(`/${tableName}/save`, async (ctx, next) => {
    const client = ctx.request.ip;
    const costs = ctx.request.body;
    console.log(`koa-router: client(${client}) request.(/cost/${tableName}/save)`);
    var success = true;
    costs.forEach(async (cost) => {
      var query =
        `UPDATE zix.${tableName}_cost SET
        retail_cost = ?,
        supply_cost = ?
        WHERE ${prefix}_id = ?;`;
      var elements = [cost.retail_cost, cost.supply_cost, cost[`${prefix}_id`]];
      success = success && await dbpool.fetch(query, elements);
    });
    ctx.body = success;
  });
}

module.exports = router;
