const chalk = require('chalk')
module.exports = function (commandName, moduleName) {
  try {
    return require(moduleName)
  } catch (err) {
    console.log(chalk.cyan(err))
  }
}