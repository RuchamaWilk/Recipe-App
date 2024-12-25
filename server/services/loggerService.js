//server/sevices/loggerService.js
const winston = require('winston');
const path = require('path');

const logDirectory = path.join(__dirname, '..', 'log');

// הגדרת פורמט הלוגים
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}]: ${message}`;
  })
);

// יצירת ה-logger
const logger = winston.createLogger({
  level: 'info',  // רמת הלוג (אינפורמציה ברירת מחדל)
  format: logFormat,
  transports: [
    // רישום לקובץ
    new winston.transports.File({ filename: path.join(logDirectory, 'logger.log') }),
  ]
});

module.exports = logger;
