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

const cost = require('./cost.js');
router.use(cost.routes());
router.use(cost.allowedMethods());

const schedule = require('./schedule.js');
router.use(schedule.routes());
router.use(schedule.allowedMethods());

module.exports = router;
