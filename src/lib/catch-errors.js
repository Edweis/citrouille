export async function  catchErrors(ctx, next) {
  console.log(ctx.method, ctx.path)
  try {
    await next()
  } catch (error) {
    console.error(error)
    ctx.status = 500
    ctx.body = { ...error, message: error.message }
  }
}