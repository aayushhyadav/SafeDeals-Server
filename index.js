const genServer = require("./server/app")
const dotenv = require("dotenv")

const envVar = dotenv.config()
if (envVar.error) {
  throw envVar.error
}

const PORT1 = Number(process.env.GENSEVPORT)

genServer.listen(PORT1, () => console.log(`Server listening on ${PORT1}`))
