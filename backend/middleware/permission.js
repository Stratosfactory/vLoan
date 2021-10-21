const User = require("../models/userSchema")

module.exports = (...permittedRoles) => {

    return (req, res, next) => {
        const _id = req.userId
        console.log(_id)
        User.findById(_id)
            .then((foundUser) => {

                if (permittedRoles.includes(foundUser.role)) {
                    req.role = foundUser.role
                    next();
                } else {
                    const error = new Error("Insufficent Role Permission")
                    error.statusCode = 401
                    next(error)
                }
            })
            .catch((err) => {
                const error = new Error("Missing user data")
                error.statusCode = 400
                next(error)
            })



    }

}