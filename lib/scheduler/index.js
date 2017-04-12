const {List} = require('immutable');

const logger = require('../logger');
const tasks   = require('./tasks');

function initializeTasks(config) {
  const tasksQueue     = List();
  const fetchQueue     = List();
  const injectQueue    = List();
  const inspectQueue   = List();
  const targets        = config.get('targets');
  const targetsKeys    = Object.keys(targets);

  const tasksMap = [
    ['fetch',   fetchQueue,   [url]],
    ['inject',  injectQueue,  []],
    ['inspect', inspectQueue, [tests]]
  ]

  targetsKeys.forEach((targetKey) => {
    const target = targets[targetKey];

    tasksMap.forEach((taskMap) => {
      const queue = taskMap[1];
      const task  = tasks.create(taskMap[0], targetKey, target)

      if (task) { queue.push(task); }
    });
  });

  return tasks;
}

function start(config, initialTasks) {
  logger.info('Schedulers is up and running.');
}

module.exports = {
  start,
  initializeTasks
}
