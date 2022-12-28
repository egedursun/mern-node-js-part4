
const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
    {
        title: "The first blog of the series",
        author: "Ege Dursun",
        url: "/the-first-blog",
        likes: 5,
    },
    {
        title: "Here is another dummy blog",
        author: "Mert Tekin",
        url: "/the-dummy-blog-the-best",
        likes: 99,
    },
    {
        title: "A third one never hurts",
        author: "Onur Sermik",
        url: "/onur-sermik-third-one",
        likes: 723,
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: "willberemovedsoon", author: "hereauthor", url: "/blah", likes: 5 })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb,
}

