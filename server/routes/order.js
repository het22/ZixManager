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

// 주문고객작성 페이지 - 신규주문 삽입 쿼리
router.post('/register', async (ctx, next) => {
  let client = ctx.request.ip;
  console.log(`koa-router: client(${client}) request.(/order/register)`);
  let order = ctx.request.body;

  // keys: `key, key, ... , key`
  // elements: [value, value, ... , value]
  // values: `?, ?, ... , ?`
  var keys = ``;
  var values = ``;
  var elements = [];
  for (var key in order) {
    keys += `${key},`;
    values += `?,`;
    elements.push(order[key]);
  }
  keys = keys.slice(0, -1);
  values = values.slice(0, -1);

  let query =
    `INSERT INTO
    zix.order
    (${keys})
    VALUES
    (${values})`;
  let success = await dbpool.fetch(query, elements);
  ctx.body = !!success;
});

// 주문 정보 수정 요청
router.post('/modify/:id', async (ctx, next) => {
  let id = ctx.params.id;
  let client = ctx.request.ip;
  let order = ctx.request.body;
  console.log(`koa-router: client(${client}) request.(/order/modify/${id})`);

  // keyValues: `key=?, key=?, ... , key=?`
  // elements: [value, value, ... , value]
  var keyValues = ``;
  var elements = [];
  for (var key in order) {
    if (key=='ord_id' || key=='mem_userid' || key=='mem_username') continue;
    keyValues += `${key} = ?,`;
    elements.push(order[key]);
  }
  keyValues = keyValues.slice(0, -1);

  let query =
    `UPDATE
    zix.order
    SET
    ${keyValues}
    WHERE
    ord_id = ${id}`
  let success = await dbpool.fetch(query, elements);
  ctx.body = !!success;
});

// 주문 삭제 요청
router.post('/delete/:id', async (ctx, next) => {
  let id = ctx.params.id;
  let client = ctx.request.ip;
  console.log(`koa-router: client(${client}) request.(/order/delete/${id})`);
  let query =
    `DELETE FROM
     zix.order
     WHERE
     ord_id=?`;
  let success = await dbpool.fetch(query, id);
  ctx.body = !!success;
});

module.exports = router;
