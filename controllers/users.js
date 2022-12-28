
const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")
const validators = require("../utils/validators")

usersRouter.post("/", async (request, response) => {
    const { username, name, password } = request.body

    // ADDITIONS FOR THE EXERCISE (4.16)
    if (username === undefined || password === undefined){
        return response.status(400).json({
            error: "username and/or password is not defined"
        })
    }

    if (await validators.usernameValidator(username) === false){
        return response.status(400).json({
            error: "username must contain at least 3 characters"
        })
    }

    if (await validators.passwordValidator(password) === false){
        return response.status(400).json({
            error: "password must contain at least 3 characters"
        })
    }

    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return response.status(400).json({
            error: "username must be unique"
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.get("/", async (request, response) => {
    const users = await User
        .find({}).populate("blogs", { title: 1, author: 1, url: 1, likes: 1 })

    response.json(users)
})

module.exports = usersRouter