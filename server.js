import { fileURLToPath } from 'url'
import { dirname } from 'path'
import Koa from 'koa'
import serve from 'koa-static'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = new Koa()

const staticDir = `${__dirname}/dist`

app.use(serve(staticDir))

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server is running at http://0.0.0.0:${PORT}`)
})
