const Router = require('koa-router');
const router = new Router({
  prefix: '/order'
});
const dbpool = require('../dbpool.js');

module.exports = router;
