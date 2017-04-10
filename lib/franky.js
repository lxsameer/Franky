const cluster    = require('cluster');
const {readSync} = require('node-yaml');
const {Map}      = require('immutable');

const logger     = require('./logger');
const workerPool = require('./workers/pool');
const worker     = require('./workers/worker');
// const crawler    = require('./crawler');

function start(configFile) {
  const config = Map(readSync(configFile, {encoding: "utf8"}));
  if (cluster.isMaster) {
    logger.info("Cyborg franky is raising...");
    workerPool.create()
  }
  else {
    // I'm a poor worker who has to work.
    logger.info(`Bootstraping worker <${process.pid}>`)
    worker.start();
  }
}

module.exports = {
  start
};
