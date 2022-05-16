require('dotenv').config({ path: "./config.env" })
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
require('./db/conn')

app.use(express.json())
app.use(cookieParser())

app.use(require('./routers/auth'))

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}...`)
})