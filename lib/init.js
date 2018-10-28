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
    // console.log(chalk.rgb(115, 228, 203).bold(data))
    let targetFilePath = path.resolve('meet.config.js')
    let templatePath = path.join(__dirname, '../config/iview-config.js');
    let contents = fs.readFileSync(templatePath, 'utf8');
    fs.writeFileSync(targetFilePath, contents, 'utf8');
    console.log(chalk.green('Initialize iview config success \n'));
    process.exit(0);
  })
}

// mkdir
function mkdirSync(url, mode, cb) {
  var arr = url.split("/"),
    mode = mode || 0755,
    cb = cb || function () {};
  if (arr[0] === ".") {
    arr.shift();
  }
  if (arr[0] == "..") {
    arr.splice(0, 2, arr[0] + "/" + arr[1])
  }

  function inner(cur) {
    if (!fs.existsSync(cur)) { //不存在就创建一个
      fs.mkdirSync(cur, mode)
    } else {
      log(chalk.green(url + '目录已经存在，请重新创建'))
      return
    }
    if (arr.length) {
      inner(cur + "/" + arr.shift());
    } else {
      cb();
    }
  }
  arr.length && inner(arr.shift());
}
module.exports = function (projectName) {
  mkdirSync(projectName)
}