const Router = require('koa-router');
const router = new Router({
  prefix: '/article'
});

const member = require('./member.js');
router.use(member.routes());
router.use(member.allowedMethods());

const order = require('./order.js');
router.use(order.routes());
router.use(order.allowedMethods());

module.exports = router;
