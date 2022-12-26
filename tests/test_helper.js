
const Blog = require("../models/blog")

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

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb
}

