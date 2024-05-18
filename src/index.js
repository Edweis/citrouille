import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser'
import { catchErrors } from './lib/catch-errors.js';
import { render } from './lib/render.js';
import serve from 'koa-static'
import mount from 'koa-mount'
import fs from 'fs/promises'
const app = new Koa();
const router = new Router();

// Middlewares
app
  .use(bodyParser())
  .use(catchErrors)

// Assets
app.use(mount('/images', serve('src/images')))
app.use(mount('/assets', serve('src/assets')))


// Endpoints
router.get('/', async (ctx) => {
  const name = ctx.query.name
  if (name) ctx.body = render('main', { name })
  const allFiles = await fs.readdir('src/images')
  const file = allFiles.sort(() => Math.random() - 0.5)[0].replace('src/', '')
  ctx.body = render('main', { name: file })
});


app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(7761, () => console.log('Open: http://localhost:7761'));