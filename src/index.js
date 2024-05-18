import Koa from 'koa';
import Router from '@koa/router';
import { koaBody } from 'koa-body'
import { catchErrors } from './lib/catch-errors.js';
import { render } from './lib/render.js';
import serve from 'koa-static'
import mount from 'koa-mount'
import fs from 'fs/promises'
import shell from 'shelljs';


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
    if (allFiles.length === 0) file = 'no-file'
    else file = allFiles.sort(() => Math.random() - 0.5)[0].replace('src/', '')
    ctx.redirect('/?file=' + file)
  }
  file = file.split('/')[0] // for 'Security'
  ctx.body = render('main', { file: file })
});

const genFilename = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
const parseFile = koaBody({ multipart: true, formidable: { filename: genFilename } })
router.post('/', parseFile, async (ctx) => {
  const { filepath, newFilename } = ctx.request.files.photo
  console.log('Starting convert ...')
  shell.exec(`convert ${filepath} -resize 1080x1920^ -auto-orient -quality 80 ${filepath}.webp`)
  await fs.rename(filepath + '.webp', 'src/images/' + newFilename + '.webp')
  ctx.redirect('/?file=' + newFilename + '.webp')
})

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(7761, () => console.log('Open: http://localhost:7761'));