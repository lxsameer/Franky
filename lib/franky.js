const cluster    = require('cluster');
const {readSync} = require('node-yaml');
const {Map}      = require('immutable');

const logger     = require('./logger');
const workerPool = require('./workers/pool');
const worker     = require('./workers/worker');
const scheduler  = require('./scheduler');
// const crawler    = require('./crawler');

function start(configFile) {
  const config = Map(readSync(configFile, {encoding: "utf8"}));

  // This is the initial task queue work workers. It's an Immutable
  // Queue implemented by a list.
  const initialTaskQueue = scheduler.initializeTasks(config);

  if (cluster.isMaster) {
    logger.info("Cyborg franky is raising...");
    workerPool.create(config, initialTaskQueue);
  }
  else {
    // I'm a poor worker who has to work.
    logger.info(`Bootstraping worker <${process.pid}>`)
    worker.start(config);
  }
}

module.exports = {
  start
};
