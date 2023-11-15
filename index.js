const genServer = require("./server/app")

const PORT1 = Number(process.env.GENSEVPORT)

genServer.listen(PORT1, () => console.log(`Server listening on ${PORT1}`))
