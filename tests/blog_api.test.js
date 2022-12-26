const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const helper = require("./test_helper")
const api = supertest(app)

const Blog = require("../models/blog")

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log("The test database has been cleared.")

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }

    console.log("Dummy database has been initialized...")
}, 100000)

// EXERCISE (4.8)
test("blogs are returned as json", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
}, 100000)

// EXERCISE (4.8)
test("the total number of notes in DB", async () => {
    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
}, 100000)

// EXERCISE (4.9)
test("checking the id property existence", async () => {
    const notesAtStart = await helper.blogsInDb()
    const noteToCheck = notesAtStart[0]

    // check if id field is defined
    expect(noteToCheck.id).toBeDefined()
})

// EXERCISE (4.10)
test("checking successful creation of blog post", async () => {
    const newBlog = {
        title: "The recently created blog",
        author: "Alma Mater",
        url: "/new-blog-post",
        likes: 100,
    }

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
        "The recently created blog"
    )
})

// EXERCISE (4.11)
test("check if missing likes property is handled well", async () => {
    const newBlog = {
        title: "The blog without pre-defined likes",
        author: "Another Writer",
        url: "/a-blog-without-likes"
    }

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    const blogs = await helper.blogsInDb()
    const controlBlog = blogs.filter((n) => {return n.title === "The blog without pre-defined likes"})[0]
    expect(controlBlog.likes).toBeDefined()
})

// EXERCISE (4.12)
test("check if the title and url missing is handled well", async () => {
    const newBlogNoTitle = {
        author: "John Notitleprovider",
        url: "/oops-forgot-the-title",
        likes: 97,
    }

    const newBlogNoUrl = {
        title: "I hate generating URLs, so here is a blog",
        author: "Nick Nourlsupplier",
        likes: 98,
    }

    // check the blog with no "title"
    await api
        .post("/api/blogs")
        .send(newBlogNoTitle)
        .expect(400)

    // check the blog with no "url"
    await api
        .post("/api/blogs")
        .send(newBlogNoUrl)
        .expect(400)
})

// EXERCISE (4.13)
describe("deleting a blog post", () => {
    test("a blog can be deleted", async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAfter = await helper.blogsInDb()

        expect(blogsAfter).toHaveLength(helper.initialBlogs.length -1)

        const titles = blogsAfter.map(n => n.title)

        expect(titles).not.toContain(blogToDelete.title)
    })
})

// EXERCISE (4.14)
describe("updating the blog posts", () => {
    test("update only likes", async () => {
        const noteBefore = {
            title: "AAA",
            author: "BBB",
            url: "/aaa",
            likes: 10
        }

        await api.post("/api/blogs").send(noteBefore).expect(201)
        const blogs = await helper.blogsInDb()
        const controlId = blogs.filter((n) => {return n.title === "AAA"})[0].id

        const changeNote = {
            likes: 1000
        }

        const newNote = await api.put(`/api/blogs/${controlId}`).send(changeNote)
        expect(newNote.body.likes).toBe(changeNote.likes)
    })

    test("update only title", async () => {
        const noteBefore = {
            title: "AA2",
            author: "BB2",
            url: "/aa2",
            likes: 11
        }

        await api.post("/api/blogs").send(noteBefore).expect(201)
        const blogs = await helper.blogsInDb()
        const controlId = blogs.filter((n) => {return n.title === "AA2"})[0].id

        const changeNote = {
            title: "AA..."
        }

        const newNote = await api.put(`/api/blogs/${controlId}`).send(changeNote)
        expect(newNote.body.title).toBe(changeNote.title)
    })

    test("update only author", async () => {
        const noteBefore = {
            title: "AA3",
            author: "BB3",
            url: "/aa3",
            likes: 12
        }

        await api.post("/api/blogs").send(noteBefore).expect(201)
        const blogs = await helper.blogsInDb()
        const controlId = blogs.filter((n) => {return n.title === "AA3"})[0].id

        const changeNote = {
            author: "BB---"
        }

        const newNote = await api.put(`/api/blogs/${controlId}`).send(changeNote)
        expect(newNote.body.author).toBe(changeNote.author)
    })

    test("update everything together", async () => {
        const noteBefore = {
            title: "AA4",
            author: "BB4",
            url: "/aa4",
            likes: 13
        }

        await api.post("/api/blogs").send(noteBefore).expect(201)
        const blogs = await helper.blogsInDb()
        const controlId = blogs.filter((n) => {return n.title === "AA4"})[0].id

        const changeNote = {
            title: "AA***",
            author: "BB<><>",
            likes: 999999
        }

        const newNote = await api.put(`/api/blogs/${controlId}`).send(changeNote)
        console.log(newNote)

        expect(newNote.body.author).toBe(changeNote.author)
        expect(newNote.body.title).toBe(changeNote.title)
        expect(newNote.body.likes).toBe(changeNote.likes)
    })
})

afterAll(() => {
    mongoose.connection.close()
})