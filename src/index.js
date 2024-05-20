import Koa from 'koa';
import Router from '@koa/router';
import { koaBody } from 'koa-body'
import { catchErrors } from './lib/catch-errors.js';
import { render } from './lib/render.js';
import serve from 'koa-static'
import mount from 'koa-mount'
import fs from 'fs/promises'
import database from './lib/db.js';


const app = new Koa();
const router = new Router();

// Middlewares
app.use(catchErrors)

// Assets
const ONE_YEAR_IN_MS = 1000 * 60 * 60 * 24 * 365
app.use(mount('/images', serve('src/images', { maxAge: ONE_YEAR_IN_MS })))
app.use(mount('/assets', serve('src/assets')))


// Get a photo
router.get('/', async (ctx) => {
  let file = ctx.query.file
  if (file == null) {
    const allFiles = await fs.readdir('src/images')
    if (allFiles.length === 0) file = 'no-file'
    else file = allFiles.sort(() => Math.random() - 0.5)[0].replace('src/', '')
    ctx.redirect('/?file=' + file)
  }
  file = file.split('/')[0] // for 'Security'
  const details = await database.get('SELECT * FROM photos WHERE id = $0', file)
  console.log({ details })
  ctx.body = render('main', { file, details })
});

// Upload a photo
const genFilename = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
const parseFile = koaBody({ multipart: true, formidable: { filename: genFilename } })
router.post('/', parseFile, async (ctx) => {
  console.log(ctx.request.files)
  const { filepath, newFilename } = ctx.request.files.photo
  await fs.rename(filepath, 'src/images/' + newFilename)
  await database.run(`INSERT INTO photos (id) VALUES (?)`, newFilename)
  ctx.redirect('/?file=' + newFilename)
})

// Update a photo
router.put('/:file', koaBody(), async (ctx) => {
  const file = ctx.params.file
  const { note, difficulty, category } = ctx.request.body
  console.log('UPDATING ...', ctx.request.body, file)
  await database.run(`
    UPDATE photos 
    SET note = ?, difficulty = ?, category = ?
    WHERE id = ?`, note, difficulty, category, file);
  ctx.body = undefined;
})

// Delete a photo
router.delete('/:file', koaBody(), async (ctx) => {
  const file = ctx.params.file;
  await database.run(`DELETE FROM photos WHERE id = ?`, file);
  fs.unlink('src/images/' + file)
  ctx.set('HX-Location', '/')
})

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(7761, () => console.log('Open: http://localhost:7761'));