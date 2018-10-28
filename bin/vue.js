#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')

program
  .version(require('../package.json').version, '-V, --version')
  .usage('<command> [options]')

program
  .command('init <project-name>')
  .description('create a new project powered by ivue-cli')
  .action(function () {
  })

program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp()
    console.log()
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
  })

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
program.parse(process.argv)