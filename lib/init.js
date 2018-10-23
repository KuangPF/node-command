const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const log = console.log


module.exports = function() {
  if(fs.existsSync(path.resolve('iview.config.js'))) {

  } else {
    copyMeetConfigJS
  }
}