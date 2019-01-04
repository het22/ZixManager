const Router = require('koa-router');
const router = new Router({
  prefix: '/cost'
});
const dbpool = require('../db/dbpool.js');

const costTableNames = [
  'wallpaper',
  'plate',
  'labor'
];
const costPrefix = [
  'wlp',
  'plt',
  'lab'
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

      // keyValues: `key=?, key=?, ... , key=?`
      // elements: [value, value, ... , value]
      var keyValues = ``;
      var elements = [];
      for (var key in cost) {
        if (key==`${prefix}_id`) continue;
        keyValues += `${key} = ?,`;
        elements.push(cost[key]);
      }
      keyValues = keyValues.slice(0, -1);

      var id = cost[`${prefix}_id`];
      let query =
        `UPDATE
        zix.${tableName}_cost
        SET
        ${keyValues}
        WHERE
        ${prefix}_id = ${id}`
      success = success && await dbpool.fetch(query, elements);
    });
    ctx.body = success;
  });
}

module.exports = router;
