const logger          = require('../logger');
const {setupHandlers} = require('./worker/event_handlers');

function start(config) {
  setupHandlers();
  logger.info(`Worker <${process.pid}> ready for duty.`);
}

module.exports = {
  start
}
