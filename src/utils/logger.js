const { createLogger, format, transports } = require("winston");

module.exports = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.simple()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "combined.log" })
  ]
});
