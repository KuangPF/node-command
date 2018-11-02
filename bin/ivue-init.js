#!/usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')
const chalk = require('chalk')

program
  .usage('<template-name> [project-name]')
  .option('-c, --clone', 'use git clone')
  .option('--offline', 'use cached template')


/**
 * Help.
 */

program.on('--help', () => {
  console.log('  Examples:')
  console.log()
  console.log(chalk.gray('    # create a new project with an official template'))
  console.log('    $ vue init webpack my-project')
  console.log()
  console.log(chalk.gray('    # create a new project straight from a github template'))
  console.log('    $ vue init username/repo my-project')
  console.log()
})


/**
 * Help.
 */

function help() {
  program.parse(process.argv)
  if (program.args.length < 1) return program.help()
}
help()


/**
 * Setting.
 */
const rawName = program.args[1]
const inPlace = !rawName || rawName === '.'
inquirer.prompt([{
  type: 'confirm',
  message: inPlace ?
    'Generate project in current directory?' :
    'Target directory exists. Continue?',
  name: 'ok'
}]).then(answers => {
  if (answers.ok) {
    run()
  }
}).catch(logger.fatal)