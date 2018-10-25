#!/usr/bin/env node

const program = require('commander')

const init = require('../lib/init') // init

program
  .version(require('../package.json').version, '-v, --version')

program
  .command('rm <ddd>')
  .option('-r, --recursive', 'Remove recursively')
  .action(function (dir, cmd) {
    console.log('remove ' + dir + (cmd.recursive ? ' recursively' : ''))
  })

program.parse(process.argv)

// program.parse(process.argv)