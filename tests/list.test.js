
const listHelper = require("../utils/list_helper")

test("dummy returns one", () => {
    // const blogs = []
    // const result = listHelper.dummy(blogs)

    const result = listHelper.dummy()
    expect(result).toBe(1)
})

describe("total likes", () => {

    const listWithNoBlog = [

    ]

    const listWithOneBlog = [
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        }
    ]

    const listWithThreeBlogs = [
        {
            _id: "5a422aa71b54a676234d17f7",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 18,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 23,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f9",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 19,
            __v: 0
        }
    ]

    test("when list has no blog, equals 0 likes", () => {
        const result = listHelper.totalLikes(listWithNoBlog)
        expect(result).toBe(0)
    })

    test("when list has multiple blog, equals the likes of sum of them", () => {
        const result = listHelper.totalLikes(listWithThreeBlogs)
        expect(result).toBe(60)
    })

    test("when list has only one blog, equals the likes of that", () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
})

describe("favorite blog metrics", () => {

    //todo: define the test inputs
    const listWithNoBlog = []
    const listWithOneBlog = []
    const listWithThreeBlogs = []

    //todo: update the expectations for the tests

    test("when list with no blogs, favorite blog is empty", () => {
        const result = listHelper.favoriteBlog(listWithNoBlog)
        expect(result).toBe({})
    })

    test("when list has a single item, favorite blog is that one", () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toBe({})
    })

    test("when list has multiple elements, favorite blog is the most liked one", () => {
        const result = listHelper.favoriteBlog(listWithThreeBlogs)
        expect(result).toBe({})
    })
})

describe("author with most blogs", () => {

    //todo: define the test inputs
    const listWithNoBlog = []
    const listWithOneBlog = []
    const listWithThreeBlogs = []

    //todo: update the expectations for the tests

    test("when there is no blogs, author with most blogs is empty", () => {
        const result = listHelper.mostBlogs(listWithNoBlog)
        expect(result).toBe({})
    })

    test("when there is a single blog, the most blogging author is that blog", () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toBe({})
    })

    test("when there are multiple blogs, the most blogging author is the one with most blogs", () => {
        const result = listHelper.mostBlogs(listWithThreeBlogs)
        expect(result).toBe({})
    })
})


describe("author with most liked blogs", () => {

    //todo: define the test inputs
    const listWithNoBlog = []
    const listWithOneBlog = []
    const listWithThreeBlogs = []

    //todo: update the expectations for the tests

    test("when there is no blogs, author with most liked blogs is empty", () => {
        const result = listHelper.mostLikes(listWithNoBlog)
        expect(result).toBe({})
    })

    test("when there is a single blog, the most liked author is the single one", () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        expect(result).toBe({})
    })

    test("when there are multiple blogs, the most liked author is the one with most likes", () => {
        const result = listHelper.mostLikes(listWithThreeBlogs)
        expect(result).toBe({})
    })
})