const express = require("express")
const {json, urlencoded} = require("express")
const cors = require("cors")
const connectDB = require("../server/utility/connectDB")

const router = require("./routes/checkProximity")

const app = express()
const MONGO_URI = process.env.MONGO_URI

connectDB.connectDB(MONGO_URI)

app.use(cors())
app.use(json())
app.use(urlencoded({extended: true}))

app.use("/proximityServer", router.router)

module.exports = app
