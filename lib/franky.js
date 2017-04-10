const {readSync} = require('node-yaml');
const {Map}      = require('immutable');

const logger     = require('./logger');
const workerPool = require('./workers/pool');
// const crawler    = require('./crawler');

function start(configFile) {
  const config = Map(readSync(configFile, {encoding: "utf8"}));
  workerPool.create()
}

module.exports = {
  start
};
