
const logger = require("./logger")
const jwt = require("jsonwebtoken")
const User = require("../models/user");

const requestLogger = (request, response, next) => {
    logger.info("Method: ", request.method)
    logger.info("Path: ", request.path)
    logger.info("Body: ", request.body)
    logger.info("---")
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: "Unknown Endpoint."})
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === "CastError") {
        return response.status(400).send({error: "Malformatted ID Error"})
    } else if (error.name === "ValidationError") {
        return response.status(400).send({error: error.message})
    }

    next(error)
}

const tokenExtractor = (request, response, next) => {
    const auth = request.get("authorization")

    if (auth) {
        if (auth.toLowerCase().startsWith("bearer ")){
            request["token"] = auth.substring(7)
        }
    }

    next()
}

const tokenValidator = (request, response, next) => {

    const token = request.token

    if (! token){
        return response.status(401).json({
            error: "missing token"
        })
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (! decodedToken.id) {
        return response.status(401).json({
            error: "invalid token"
        })
    }

    next()
}

const userExtractor = async (request, response, next) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    const user =  await User.findById(decodedToken.id)
    if (! user){
        return response.status(401).json({
            error: "user not found"
        })
    } else {
        request.user = user
    }

    next()
}


module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    tokenValidator,
    userExtractor
}