
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
    // PART 5 - EXERCISES FOR ASYNC/AWAIT
    const blogs = await Blog.find()
    response.json(blogs)

    /*

    FROM PART 4 - DEPRECATED

    Blog.find({}).then(blogs => {
        response.json(blogs)
    })

     */
})

blogsRouter.post("/", async (request, response) => {
    const body = request.body

    if (body.title === undefined || body.url === undefined) {
        response.status(400).end()
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
    })

    if (body.likes !== undefined){
        blog.likes = body.likes
    }
    else {
        blog.likes = 0
    }

    // PART 5 EXERCISES FOR ASYNC/AWAIT
    try{
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } catch(exception) {
        response.status(400).end()
    }

    /*
    FROM EXERCISES OF PART 4 - DEPRECATED

    blog.save().then(savedBlog => {
        response.status(201).json(savedBlog)
    }).catch(error => next(error))

     */
})

// EXERCISE (4.13)
blogsRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

// EXERCISE (4.14)
blogsRouter.put("/:id", async (request, response) => {
    const body = request.body

    let blogToChange = await Blog.findById(request.params.id)

    if (body.title !== undefined) {
        blogToChange.title = body.title
    }
    if (body.author !== undefined) {
        blogToChange.author = body.author
    }
    if (body.likes !== undefined) {
        blogToChange.likes = body.likes
    }

    await Blog.findByIdAndUpdate(request.params.id, blogToChange, {new: true})
    response.json(blogToChange)
})

module.exports = blogsRouter