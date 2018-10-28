#!/usr/bin/env node

const program = require('commander')

const init = require('../lib/init') // init

program
  .version(require('../package.json').version, '-v, --version')

program
  .command('init <project-name>')
  .action(function (projectName) {
    init(projectName)
  })

program.parse(process.argv)
