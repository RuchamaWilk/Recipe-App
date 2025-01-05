const jwt = require("jsonwebtoken");

module.exports.generateToken = (email) => {
    return jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: "2h" });
};

module.exports.verifyJwt = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null;
    }
};
