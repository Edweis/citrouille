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
app.use(catchErrors)

// Assets
app.use(mount('/images', serve('src/images')))
app.use(mount('/assets', serve('src/assets')))


// Endpoints
router.get('/', async (ctx) => {
  let file = ctx.query.file
  if (file == null) {
    const allFiles = await fs.readdir('src/images')
    file = allFiles.sort(() => Math.random() - 0.5)[0].replace('src/', '')
    ctx.redirect('/?file=' + file)
  }
  file = file.split('/')[0] // 'Security'
  ctx.body = render('main', { file: file })
});

const random = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
router.post('/', bodyParser({ multipart: true }), async (ctx) => {
  console.log('files: ', ctx.request.files, ctx.request.body);

  ctx.redirect('/HELLO')
})

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(7761, () => console.log('Open: http://localhost:7761'));