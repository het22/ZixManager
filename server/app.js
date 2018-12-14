const Koa = require('koa');
const app = new Koa();

// history mode available
const historyApiFallback = require('koa2-connect-history-api-fallback');
app.use(historyApiFallback());

// body parser for post body
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// provide static file(index page)
const serve = require('koa-static');
app.use(serve(__dirname + '/public'));

// router
const router = require('./routes');
app.use(router.routes());
app.use(router.allowedMethods());

// execute
app.listen(3000, () => {
  console.log('koa: listening to port 3000!');
})
