#!/usr/bin/env node

const program = require('commander')
const init = require('../lib/init') // init

program
  .version(require('../package.json').version, '-V, --version')
  .usage('<command> [options]')

program
  .command('init <project-name>')
  .description('create a new project powered by iview-cli')
  .action(function (projectName) {
    program.outputHelp()
    // init(projectName)
  })

program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp()
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
  })

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
program.parse(process.argv)