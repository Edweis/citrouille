import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser'
import { catchErrors } from './lib/catch-errors.js';
import { render } from './lib/render.js';
const app = new Koa();
const router = new Router();

// Middlewares
app
  .use(bodyParser())
  .use(catchErrors)



// Endpoints
router.get('/', async (ctx) => {
  ctx.body = render('main')
});


app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(7761, () => console.log('Open: http://localhost:7761'));