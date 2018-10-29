#!/usr/bin/env node

const program = require('commander')
const semver = require('semver')
const chalk = require('chalk')

const requiredVersion = require('../package.json').engines.node

function checkNodeVersion(wanted, id) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(chalk.red(
      'You are using Node ' + process.version + ', but this version of ' + id +
      ' requires Node ' + wanted + '.\nPlease upgrade your Node version.'
    ))
    process.exit(1)
  }
}

checkNodeVersion(requiredVersion, 'ivue-cli')

program
  .version(require('../package.json').version, '-V, --version')
  .usage('<command> [options]')

program
  .command('init <project-name>')
  .description('create a new project powered by ivue-cli')
  .action(function () {})

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