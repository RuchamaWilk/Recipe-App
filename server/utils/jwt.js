//server/utils/jwt
const jwt = require("jsonwebtoken");

const generateToken = (id, email, type) => {
    console.log(`id: ${id}` );
    console.log(`email: ${email}` );
    console.log(`type: ${type}` );
    return jwt.sign({_id:  id, emailAddress: email,type: type }, process.env.JWT_SECRET, { expiresIn: "2m" });
};

const verifyJwt = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null;
    }
}
module.exports ={generateToken,verifyJwt}