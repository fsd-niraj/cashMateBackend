const { format, createLogger, transports } = require('winston');
const { timestamp, combine, printf, colorize, json, errors } = format;

require("winston-daily-rotate-file")

const log_transport = new transports.DailyRotateFile({
  filename: './logs/mernBackend-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  level: 'debug',
  frequency: 'daily'
});

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level} ${message}`
})

const logger = createLogger({
  format: combine(
    colorize(),
    timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    logFormat,
  ),
  transports: [
    new transports.Console()
  ],
});

module.exports = logger;