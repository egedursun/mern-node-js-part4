
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

module.exports = {
    dummy,
    totalLikes
}