#!/usr/bin/env node

const program = require('commander')

const init = require('../lib/init') // init

program
  .version(require('../package.json').version, '-v, --version')

program
  .command('init')
  .description('generate a new project from a template')
  .action(init)
program.parse(process.argv)