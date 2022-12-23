
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