const logger = require('../../logger');

function onMessage(event) {
  logger.debug(`onMessage event handler for <${process.pid}> worker.`);
}

function onDisconnect(event) {
  logger.debug(`onDisconnect event handler for <${process.pid}> worker.`);
}

function onError(event) {
  logger.debug(`onError event handler for <${process.pid}> worker.`);
}

function onExit(event) {
  logger.debug(`onExit event handler for <${process.pid}> worker.`);
}

function onListening(event) {
  logger.debug(`onListening event handler for <${process.pid}> worker.`);
}

function onOnline(event) {
  logger.debug(`onOnline event handler for <${process.pid}> worker.`);
}

function setupHandlers() {
  process.on('message', onMessage);
  process.on('disconnect', onDisconnect);
  process.on('error', onError);
  process.on('exit', onExit);
  process.on('listening', onListening);
  process.on('online', onOnline);
}

module.exports = {
  setupHandlers
}
