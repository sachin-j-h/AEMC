const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const express = require("express")
const router = express.Router()
const Authenticate = require('../middlewares/Authenticate')

require("../db/conn")
const User = require('../models/user')

// Home Page Route
router.get('/', (req, res) => {
    res.send("Hello Root from Auth.js")

})

// About Us Route
router.get('/about', Authenticate, (req, res) => {
    res.send(req.loggedInUser)
})

router.get('/courses', (req, res) => {
    courseData = [
        {
            "Name": "Intro to Web Dev",
            "Desc": "Web Dev Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi atque consectetur ullam aut pariatur suscipit, officiis nam possimus cupiditate tempora! At ducimus aliquam dolorum ipsa odio, mollitia provident non maxime.",
            "Price": 999,
            "Duration": 7
        },
        {
            "Name": "Intro to ML",
            "Desc": "ML Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi atque consectetur ullam aut pariatur suscipit, officiis nam possimus cupiditate tempora! ",
            "Price": 1200,
            "Duration": 4
        },
        {
            "Name": "Intro to C",
            "Desc": "C Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi atque consectetur ullam aut pariatur suscipit",
            "Price": 799,
            "Duration": 12
        },
        {
            "Name": "Intro to C",
            "Desc": "C Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi atque consectetur ullam aut pariatur suscipit",
            "Price": 799,
            "Duration": 12
        }
    ]
    req.courseData = courseData
    res.send(req.courseData)
})

router.get('/logout', (req, res) => {
    res.clearCookie('jwtoken', { path: "/" })
    res.status(200).send("User logged out successfully")
})

// Registration Route
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    if (!firstName || !lastName || !email || !password) {
        return res.status(422).json({ error: "Please fill all the data" })
    }

    try {
        const userExists = await User.findOne({ email: email })
        if (userExists) {
            return res.status(422).json({ error: "User already Exists" })
        }

        const newUser = new User({ firstName, lastName, email, password })

        const userRegister = await newUser.save()
        if (userRegister) {
            return res.status(201).json("User created successfully")
        } else {
            res.status(500).json({ error: "Failed to register" })
        }
    } catch (err) {
        console.log(err)
    }
})


// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill all the fields" })
        }

        const registeredUser = await User.findOne({ email: email })
        if (registeredUser) {
            const passwordMatch = await bcrypt.compare(password, registeredUser.password)
            if (!passwordMatch) {
                res.status(400).json("Invalid Credentials")
            } else {
                let token = await registeredUser.generateAuthToken()
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 2592000000),
                    httpOnly: true
                })
                res.json({ message: "User login successfull", registeredUser })
            }
        } else {
            res.status(400).json({ error: "Please register" })
        }
    } catch (err) {
        console.log(err)
    }
})


module.exports = router