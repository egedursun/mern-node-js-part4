

// FOR EXERCISE (4.16)
const usernameValidator = async (s) => {
    return s.length >= 3;
}

// FOR EXERCISE (4.16)
const passwordValidator = async (s) => {
    return s.length >= 3
}

module.exports = {
    usernameValidator,
    passwordValidator
}