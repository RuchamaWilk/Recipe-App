// server/middlewares/chefMiddleware.js
const logger = require('../services/loggerService');

const jwt = require('jsonwebtoken');

const verifyChef = (req, res, next) => {
    try {
        logger.info(`chefMiddleware`)
        const token = req.headers.authorization?.split(' ')[1]; // הנחת טוקן ב-Header
        logger.info(token)
        if (!token) {
            logger.info("why are you here?")
            return res.status(401).json({ message: 'Authorization token required' });
        }
        logger.info(process.env.JWT_SECRET)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        logger.info(`type ${decoded.type}`)
        if (decoded.type !== 'chef') {
            return res.status(403).json({ message: 'Access denied. Only chefs can perform this action.' });
        }

        req.user = decoded; // שמירת נתוני המשתמש לצורך שימוש בהמשך
        logger.info(req.user)
        next();
    } catch (err) {
        logger.error(`Token verification error: ${err.message}`);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};



module.exports = {verifyChef};
