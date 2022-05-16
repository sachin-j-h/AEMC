const jwt = require('jsonwebtoken')
const User = require('../models/user')

const Authenticate = async (req, res, next) => {

    try {
        const token = req.cookies.jwtoken
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)

        const loggedInUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token })

        if (!loggedInUser) { throw new Error("User Not Found") }

        req.token = token
        req.loggedInUser = loggedInUser
        req.loggedInID = loggedInUser._id

    } catch (err) {
        res.status(401).send("No token provided")
        console.log(err)
    }

    next()
}

module.exports = Authenticate