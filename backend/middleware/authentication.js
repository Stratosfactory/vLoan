const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const header = req.get("Authorization")

    if (header) {
        let decodedJWT
            //const token = req.get("Authorization").split(' ')[1]
        const token = header
        try {

            decodedJWT = jwt.verify(token, "qTrackSecretKey2021")
        } catch (err) {
            console.log(decodedJWT)
            err.statusCode = 500
            throw err
        }

        if (!decodedJWT) {
            const error = new Error("User could not be authenticated")
            error.statusCode = 401
            throw error
        }

        req.email = decodedJWT.email;
        next();
    } else {
        const error = new Error("User could not be authenticated")
        error.statusCode = 401
        throw error
    }
}