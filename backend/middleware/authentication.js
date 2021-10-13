const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const token = req.get("Authorization").split(" ")[1]; // Abfrage des Authorization-Headers aus den Request-Headers
    let decodedToken;


    try {
        decodedToken = jwt.verify(token, process.env.jwt_secret);
    } catch (err) {

        const error = new Error(err)
        error.statusCode = 401
        throw error
    }

    if (!decodedToken) {
        const error = new Error("Not Authorized")
        error.statusCode = 401
        throw error
    }

    req.userId = decodedToken.userId;
    req.email = decodedToken.email;


    next();


}