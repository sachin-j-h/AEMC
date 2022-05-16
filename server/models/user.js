const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

// User Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    enrolledCourses: [{
        enrolledCourseID: {
            type: String
        },
        result: {
            type: Number
        }
    }],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

// Password Hashing
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next()
})

// Generating the tokens
userSchema.methods.generateAuthToken = async function () {
    try {
        let newToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token: newToken })
        await this.save()
        return newToken
    } catch (err) {
        console.log(err)
    }
}

module.exports = mongoose.model("user", userSchema)
