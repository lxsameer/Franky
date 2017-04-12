function create(taskName, targetName, target) {
  return {task: taskName, targetName: targetName, target: target };
}

module.exports = {
  create
}
