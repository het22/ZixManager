const Router = require('koa-router');
const router = new Router({
  prefix: '/article'
});
const dbpool = require('../dbpool.js');

router.get('/member', async (ctx, next) => {
  const client = ctx.request.ip;
  console.log("server: client request.(" + client + " /member)");
  ctx.body = await fetch('SELECT * FROM zix.member')
});

router.get('/member/:id', async (ctx, next) => {
  const id = ctx.params.id;
  const client = ctx.request.ip;
  console.log("server: client request.(" + client + " /member/" + id + ")");
  ctx.body = await fetch('SELECT * FROM zix.member WHERE mem_id=' + id + '');
});

router.post('/member_receiver/modify/:id', async (ctx, next) => {
  const id = ctx.params.id;
  const client = ctx.request.ip;
  const member = ctx.request.body;
  console.log("server: client request.(" + client + " /member_receiver/modify" + id + ")");
  const query =
    `UPDATE zix.member SET
    mem_email = "${member.mem_email}",
    mem_phone = "${member.mem_phone}",
    mem_address = "${member.mem_address}",
    mem_birthday = "${member.mem_birthday}",
    mem_remarks = "${member.mem_remarks}"
    WHERE mem_id = ${id}`
  const success = await fetch(query);
  ctx.body = (success != false) ? true : false;
});

router.post('/member_receiver/new', async (ctx, next) => {
  const client = ctx.request.ip;
  const member = ctx.request.body;
  console.log("server: client request.(" + client + " /new_member_receiver/)");
  const query =
    'INSERT INTO zix.member\
    (mem_userid, mem_username, mem_email, mem_phone, mem_address, mem_remarks)\
    VALUES ("' + member.mem_userid + '", "' + member.mem_username + '", "' + member.mem_email + '", "' + member.mem_phone + '", "' + member.mem_address + '", "' + member.mem_remarks + '")\
    '
  const success = await fetch(query);
  ctx.body = (success != false) ? true : false;
});

router.post('/member_receiver/delete/:id', async (ctx, next) => {
  const id = ctx.params.id;
  const client = ctx.request.ip;
  console.log("server: client request.(" + client + " /member_receiver/delete/" + id + ")");
  const query = 'DELETE FROM zix.member WHERE (mem_id = ' + id + ')';
  const success = await fetch(query);
  ctx.body = (success != false) ? true : false;
});

async function fetch(query) {
  // try database connection
  try {
    const connection = await dbpool.getConnection(async conn => conn);
    // try query
    try {
      const res = await connection.query(query);
      connection.release();
      // check query result
      if (res[0].length == 0) {
        console.log('db: query result is empty.');
        return false;
      } else {
        console.log('db: query result is returned.');
        return res[0];
      }
    } catch (err) {
      console.log('db: query error(' + err + ')');
      return false;
    }
  } catch (err) {
    console.log('db: connection error(' + err + ')');
    return false;
  }
}

module.exports = router;
