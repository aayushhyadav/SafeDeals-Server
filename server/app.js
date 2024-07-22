const express = require("express")
const {json, urlencoded} = require("express")
const cors = require("cors")
const connectDB = require("./utility/connectDB")

const authRouter = require("./routes/auth")
const indexRouter = require("./routes/index")
const adRouter = require("./routes/ad")
const statsRouter = require("./routes/stats")
const reviewRouter = require("./routes/review")
const proximityRouter = require("./routes/checkProximity")

const app = express()
const MONGO_URI = process.env.MONGO_URI

connectDB.connectDB(MONGO_URI)

app.use(cors())
app.use(json())
app.use(urlencoded({extended: true}))

app.use("/", indexRouter.homeRouter)
app.use("/auth", authRouter.authRouter)
app.use("/ad", adRouter.adRouter)
app.use("/stats", statsRouter.statsRouter)
app.use("/review", reviewRouter.reviewRouter)
app.use("/proximityServer", proximityRouter.proximityRouter)

module.exports = app
