const Router = require('koa-router');
const router = new Router({
  prefix: '/member'
});
const dbpool = require('../dbpool.js');

// 전체고객정보 페이지 - 테이블에 보여줄 전체고객정보 쿼리
router.get('/', async (ctx, next) => {
  console.log(`koa-router: client(ip: ${ctx.request.ip}) request.(${ctx.request.url})`);
  let query =
    `SELECT
    mem_id, mem_username, mem_userid, mem_phone, mem_adr_home, mem_remarks
    FROM
    zix.member`;
  ctx.body = await dbpool.fetch(query)
});

// 상세고객정보 페이지 - 회원의 모든 개인정보 쿼리
router.get('/:id', async (ctx, next) => {
  console.log(`koa-router: client(ip: ${ctx.request.ip}) request.(${ctx.request.url})`);
  let id = ctx.params.id;
  let query =
    `SELECT
    *
    FROM
    zix.member
    WHERE
    mem_id=?`;
  ctx.body = await dbpool.fetch(query, id);
});

// 신규고객작성 페이지 - 신규회원 삽입 쿼리
router.post('/register', async (ctx, next) => {
  console.log(`koa-router: client(ip: ${ctx.request.ip}) request.(${ctx.request.url})`);
  let member = ctx.request.body;

  // keys: `key, key, ... , key`
  // elements: [value, value, ... , value]
  // values: `?, ?, ... , ?`
  var keys = ``;
  var values = ``;
  var elements = [];
  for (var key in member) {
    keys += `${key},`;
    values += `?,`;
    elements.push(member[key]);
  }
  keys = keys.slice(0, -1);
  values = values.slice(0, -1);

  let query =
    `INSERT INTO
    zix.member
    (${keys})
    VALUES
    (${values})`;
  let success = await dbpool.fetch(query, elements);
  ctx.body = !!success;
});

// 고객 삭제 요청
router.post('/delete/:id', async (ctx, next) => {
  console.log(`koa-router: client(ip: ${ctx.request.ip}) request.(${ctx.request.url})`);
  let id = ctx.params.id;
  let query =
    `DELETE FROM
     zix.member
     WHERE
     mem_id=?`;
  let success = await dbpool.fetch(query, id);
  ctx.body = !!success;
});

// 고객 정보 수정 요청
router.post('/modify/:id', async (ctx, next) => {
  console.log(`koa-router: client(ip: ${ctx.request.ip}) request.(${ctx.request.url})`);
  let id = ctx.params.id;
  let member = ctx.request.body;

  // keyValues: `key=?, key=?, ... , key=?`
  // elements: [value, value, ... , value]
  var keyValues = ``;
  var elements = [];
  for (var key in member) {
    if (key=='mem_id') continue;
    keyValues += `${key} = ?,`;
    elements.push(member[key]);
  }
  keyValues = keyValues.slice(0, -1);

  let query =
    `UPDATE
    zix.member
    SET
    ${keyValues}
    WHERE
    mem_id = ${id}`
  let success = await dbpool.fetch(query, elements);
  ctx.body = !!success;
});

module.exports = router;
