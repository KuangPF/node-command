const chalk = require('chalk')
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')

const ask = require('./ask')
const logger = require('./logger')


// register handlebars helper
Handlebars.registerHelper('if_eq', function (a, b, opts) {
  return a === b ?
    opts.fn(this) :
    opts.inverse(this)
})

Handlebars.registerHelper('unless_eq', function (a, b, opts) {
  return a === b ?
    opts.inverse(this) :
    opts.fn(this)
})

/**
 * Generate a template given a `src` and `dest`.
 *
 * @param {String} name
 * @param {String} src
 * @param {String} dest
 * @param {Function} done
 */

module.exports = function generate(name, src, dest, done) {
  const opts = getOptions(name, src)
  const metalsmith = Metalsmith(path.join(src, 'template')) // 读取 ~/.vue-templates/template  中的所有文件
  const data = Object.assign(metalsmith.metadata(), {
    destDirName: name,
    inPlace: dest === process.cwd(),
    noEscape: true
  })
  opts.helpers && Object.keys(opts.helpers).map(key => {
    Handlebars.registerHelper(key, opts.helpers[key])
  })

  const helpers = {
    chalk,
    logger
  }

  if (opts.metalsmith && typeof opts.metalsmith.before === 'function') {
    opts.metalsmith.before(metalsmith, opts, helpers)
  }

  metalsmith
    .use(askQuestions(opts.prompts))
    .use(filterFiles(opts.filters))
    .use(renderTemplateFiles(opts.skipInterpolation))

}

/**
 * Create a middleware for asking questions.
 *
 * @param {Object} prompts
 * @return {Function}
 */

function askQuestions(prompts) {
  return (files, metalsmith, done) => {
    ask(prompts, metalsmith.metadata(), done)
  }
}