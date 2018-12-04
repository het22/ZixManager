const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');

// index page
app.use(serve(__dirname + '/../client/dist'));

// router
const router = require('./routes');

app.use(router.routes());
app.use(router.allowedMethods());

// execute
app.listen(3000, () => {
  console.log('server: listening to port 3000!');
})
