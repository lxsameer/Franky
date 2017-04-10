const chalk = require('chalk');
const log   = require('verbalize');

// Verbalize `runner`
log.runner = 'franky';

log.debug = function() {
  var args = arguments;
  args[0] = chalk.yellow(args[0]);
  return console.log.apply(this, args);
}

log.info = function() {
  var args = arguments;
  args[0] = chalk.red(args[0]);
  return console.error.apply(this, args);
}


module.exports = log
