
const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0){
        return 0
    } else if (blogs.length === 1){
        return blogs[0].likes
    }
    else{
        let summation = 0
        for(let i = 0; i < blogs.length; i++){
            summation += blogs[i].likes
        }
        return summation
    }
}

// EXERCISE (4.5)
const favoriteBlog = (blogs) => {
    if (blogs.length === 0){
        return {}
    } else if (blogs.length === 1){
        return {
            title: blogs[0].title,
            author: blogs[0].author,
            likes: blogs[0].likes
        }
    } else {
        let mostLikes = blogs[0].likes
        let mostLikedBlog = blogs[0]
        for (let i = 0; i < blogs.length; i++){
            if (blogs[i].likes > mostLikes){
                mostLikes = blogs[i].likes
                mostLikedBlog = blogs[i]
            }
        }
        return {
            title: mostLikedBlog.title,
            author: mostLikedBlog.author,
            likes: mostLikedBlog.likes
        }
    }
}

// EXERCISE (4.6)
const mostBlogs = (blogs) => {
    if (blogs.length === 0){
        return {}
    } else if (blogs.length === 1){
        return {
            author: blogs[0].author,
            blogs: 1
        }
    } else {
        let authorBlogs = {}
        for (let i = 0; i < blogs.length; i++){
            let author = blogs[i].author
            let sum = 0
            for (let j = 0; j < blogs.length; j++){
                if (blogs[j].author === author){
                    sum += 1
                }
            }
            authorBlogs[author] = sum
        }

        let maximum = 0
        let maximumAuthor = ""
        for (let item in authorBlogs){
            if (authorBlogs[item] > maximum){
                maximum = authorBlogs[item]
                maximumAuthor = item
            }
        }
        return {
            author: maximumAuthor,
            blogs: maximum
        }
    }
}

// EXERCISE (4.7)
const mostLikes = (blogs) => {
    if (blogs.length === 0){
        return {}
    } else if (blogs.length === 1){
        return {
            author: blogs[0].author,
            likes: blogs[0].likes
        }
    } else {
        let authorBlogs = {}
        for (let i = 0; i < blogs.length; i++){
            let author = blogs[i].author
            let sum = 0
            for (let j = 0; j < blogs.length; j++){
                if (blogs[j].author === author){
                    sum += blogs[j].likes
                }
            }
            authorBlogs[author] = sum
        }
        let maximum = 0
        let maximumAuthor = ""
        for (let item in authorBlogs){
            if (authorBlogs[item] > maximum){
                maximum = authorBlogs[item]
                maximumAuthor = item
            }
        }
        return {
            author: maximumAuthor,
            likes: maximum
        }
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}