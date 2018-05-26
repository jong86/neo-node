const winston = require('winston');

const common = {
  transports: [
    new winston.transports.Console({
      colorize: true,
    })
  ],
}

module.exports = {
  regular: Object.assign({}, common),

  express: Object.assign({
    colorize: true,
    meta: true,
    expressFormat: true,
    statusLevels: true,
    // bodyBlacklist: [String]
  }, common),
}