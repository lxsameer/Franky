const logger = require('../logger');

function start(arg) {
  logger.info(`Worker <${process.pid}> ready for duty.`);
}

module.exports = {
  start
}
