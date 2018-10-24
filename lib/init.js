const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const figlet = require('figlet')

const log = console.log


// generate iview.config.js
function generateConfig() {
  figlet('ivew - admin - cli', function (err, data) {
    if (err) {
      console.log('sss')
    }
    console.log(chalk.rgb(115, 228, 203).bold(data))
    let targetFilePath = path.resolve('meet.config.js')
    let templatePath = path.join(__dirname, '../config/iview-config.js');
    let contents = fs.readFileSync(templatePath, 'utf8');
    fs.writeFileSync(targetFilePath, contents, 'utf8');
    console.log(chalk.green('Initialize iview config success \n'));
    process.exit(0);
  })
}
module.exports = function () {
  if (fs.existsSync(path.resolve('iview.config.js'))) {} else {
    generateConfig()
  }
}