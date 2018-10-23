const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const figlet = require('figlet')

const log = console.log


// generate iview.config.js
function generateConfig() {
  figlet('ivew-admin-cli', function (err, data) {
    if (err) {
      console.log('sss')
    }
    console.log(chalk.rgb(115, 228, 203).bold(data));
  })
}
module.exports = function () {
  if (fs.existsSync(path.resolve('iview.config.js'))) {

  } else {
    generateConfig()
  }
}