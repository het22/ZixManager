const Router = require('koa-router');
const router = new Router();

const client = require('./article.js');

router.use(client.routes());
router.use(client.allowedMethods());

module.exports = router;
