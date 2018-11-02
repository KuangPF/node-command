#!/usr/bin/env node

const download = require('download-git-repo')
const program = require('commander')
const inquirer = require('inquirer')
const chalk = require('chalk')
const exists = require('fs').existsSync
const path = require('path')
const home = require('user-home')
const rm = require('rimraf').sync
const ora = require('ora')

const logger = require('../lib/logger')

const localPath = require('../lib/local-path')
const isLocalPath = localPath.isLocalPath
const getTemplatePath = localPath.getTemplatePath

const warnings = require('../lib/warnings')

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
let template = program.args[0]
const hasSlash = template.indexOf('/') > -1

const rawName = program.args[1]
const inPlace = !rawName || rawName === '.'
const to = path.resolve(rawName || '.')
const name = inPlace ? path.relative('../', process.cwd()) : rawName

const tmp = path.join(home, '.vue-templates', template.replace(/[\/:]/g, '-'))
if (program.offline) {
  console.log(`> Use cached template at ${chalk.yellow(tildify(tmp))}`)
  template = tmp
}

/**
 * Padding.
 */

if (inPlace || exists(to)) {
  inquirer.prompt([{
    type: 'confirm',
    message: inPlace ?
      'Generate project in current directory?' : 'Target directory exists. Continue?',
    name: 'ok',
  }]).then(answers => {
    if (answers.ok) {
      run()
    }
  }).catch(logger.fatal)
} else {
  run()
}

/**
 * Check, download and generate the project.
 */

function run() {
  // check if template is local
  if (isLocalPath(template)) {

  } else {
    // vue-cli 做了版本的比较，这里就先忽略这个...   checkVersion
    // 判断使用官方文档还是使用 github 自定义模板
    if (!hasSlash) {
      // use official templates
      const officialTemplate = 'vuejs-templates/' + template
      if (template.indexOf('#') !== -1) {
        downloadAndGenerate(officialTemplate)
      } else {
        if (template.indexOf('-2.0') !== -1) {
          // 提示带“-2.0”的模板已经弃用了，官方模板默认用2.0了。不需要用“-2.0”来区分vue1.0和vue2.0了。
          warnings.v2SuffixTemplatesDeprecated(template, inPlace ? '' : name)
          return
        }
        // warnings.v2BranchIsNowDefault(template, inPlace ? '' : name)
        downloadAndGenerate(officialTemplate)
      }
    } else {
      downloadAndGenerate(template)
    }
  }
}

/**
 * Download a generate from a template repo.
 *
 * @param {String} template
 */

function downloadAndGenerate() {
  const spinner = ora('downloading template')
  spinner.start()
  // Remove if local template exists
  if (exists(tmp)) rm(tmp)
}