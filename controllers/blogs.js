
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
    // PART 5 - EXERCISES FOR ASYNC/AWAIT
    const blogs = await Blog.find({}).populate("user", { username: 1, name: 1})
    response.json(blogs.map(blog => blog.toJSON()))

    /*

    FROM PART 4 - DEPRECATED

    Blog.find({}).then(blogs => {
        response.json(blogs)
    })

     */
})

blogsRouter.post("/", async (request, response) => {
    const body = request.body

    const user = request.user

    if (body.title === undefined || body.url === undefined) {
        response.status(400).end()
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        user: user._id
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
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
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

    const user = request.user
    const deleteBlog = await Blog.findById(request.params.id)

    if (deleteBlog.user._id.toString() === user._id.toString()) {
        try{
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        } catch (e) {
            response.status(401).json({
                error: e.message
            })
        }
    } else {
        response.status(401).json({
            error: "Invalid operation / Unauthorized"
        }).end()
    }
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