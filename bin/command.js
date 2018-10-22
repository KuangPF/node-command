#!/usr/bin/env node

const program = require('commander')

program
  .version(require('../package.json').version, '-v, --version')

program
  .command('init')
  .description('init your cli')


program.parse(process.argv)