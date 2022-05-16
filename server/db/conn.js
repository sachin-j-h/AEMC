// Database Connection
const mongoose = require('mongoose')

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.DATABASE_URL, connectionParams)
const db = mongoose.connection

db.on("error", err => console.error(err))
db.once("open", () => console.log("Connected to mongoose"))