const Koa = require('koa');
const historyApiFallback = require('koa2-connect-history-api-fallback');
const app = new Koa();
const serve = require('koa-static');

// history mode
app.use(historyApiFallback());

// index page
app.use(serve(__dirname + '/public'));

// router
const router = require('./routes');

app.use(router.routes());
app.use(router.allowedMethods());

// execute
app.listen(3000, () => {
  console.log('server: listening to port 3000!');
})
