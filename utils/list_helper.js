
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
    //todo: find which blog has most likes, return that blog
}

// EXERCISE (4.6)
const mostBlogs = (blogs) => {
    //todo: find the author which has the most amount of blogs
}

// EXERCISE (4.7)
const mostLikes = (blogs) => {
    //todo: find the author, which has the most amount of likes for the blogs
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}