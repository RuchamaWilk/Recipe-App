/*// server/middleware/errorMiddleware.js
const logger = require('../services/loggerService');

const errorMiddleware = (err, req, res, next) => {
  // רישום השגיאה בלוג
  logger.error(`Error: ${err.message}`);
  
  // שליחת הודעת שגיאה למשתמש
  res.status(500).send({ error: 'Something went wrong' });
};

module.exports = errorMiddleware;*/
