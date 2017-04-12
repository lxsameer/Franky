const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const {Map}   = require('immutable');

const worker    = require('./worker');
const logger    = require('../logger');
const scheduler = require('../scheduler');

// Setup the process/worker pool
function create(config, initialTasks) {
  logger.debug(`I'm about to create a worker pool with size of ${numCPUs + 1}`);

  if (cluster.isMaster) {
    // I'm the master process, Every one should obey me.

    const poolSize     = numCPUs + 1
    let   workers = Map()

    logger.info('Setting up escape route...')
    process.on('SIGINT', function() {
      // Terminating worker gracfully.
      workers.map((worker, pid) => {
        logger.info(`Firing worker <${pid}>`);
        worker.disconnect();
      })
      logger.info("I'm on my way out.")
      process.exit();
    });

    // Hiring some workers
    logger.info('Setting up the worker pool...');
    for(let i = 0; i < poolSize; i++) {
      let worker = cluster.fork();
      workers = workers.set(worker.process.pid, worker);
    }

    cluster.on('exit', (worker, code, signal) => {
      logger.info(`worker ${worker.process.pid} died`);
      // TODO: Revive workers if we did not finished our job.
    });

    cluster.on('online', (evt) => {
      console.log("ONLINE");
    });

    scheduler.start(config, initialTasks);
  }
  else {
    // I'm a poor worker who has to work.
  }
}

module.exports = {
  create
}
