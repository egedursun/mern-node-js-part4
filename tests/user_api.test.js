
const bcrypt = require("bcrypt")
const User = require("../models/user")
const helper = require("./test_helper")
const supertest = require("supertest")

const app = require("../app")
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({ username: "root", passwordHash})

    await user.save()
})

test("a valid user can be created", async () => {
    const start = await helper.usersInDb()
    const lengthStart = start.length

    const newUser = {
        name: "eeeeeee",
        username: "egeeee",
        password: "full"
    }

    await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    const end = await helper.usersInDb()
    const lengthInEnd = end.length

    expect(lengthInEnd).toBe(lengthStart + 1)

    const usernamesAfter = end.map(u => u.username)
    expect(usernamesAfter).toContain(newUser.username)
})

test("an invalid user can't be created", async () => {
    const invalidUser1 = {
        name: "Ege",
        username: "eg",
        password: "fullstack",
    }

    const invalidUser2 = {
        name: "Ege",
        username: "egedursun",
        password: "fu",
    }

    const invalidUser3 = {
        name: "Ege",
        username: "egedursun",
    }

    const invalidUser4 = {
        name: "Ege",
        password: "fullstack",
    }

    const invalidUser5 = {
        name: "Ege",
    }

    await api.post("/api/users")
        .send(invalidUser1)
        .expect(400)

    await api.post("/api/users")
        .send(invalidUser2)
        .expect(400)

    await api.post("/api/users")
        .send(invalidUser3)
        .expect(400)

    await api.post("/api/users")
        .send(invalidUser4)
        .expect(400)

    await api.post("/api/users")
        .send(invalidUser5)
        .expect(400)

})