const genServer = require("./server/app")
const proximityServer = require("./proximity_server/app")

const PORT1 = Number(process.env.GENSEVPORT)
const PORT2 = Number(process.env.PROXSEVPORT)

genServer.listen(PORT1, () => console.log(`Server listening on ${PORT1}`))
proximityServer.listen(PORT2, () =>
  console.log(`Proximity Server listening on ${PORT2}`)
)
