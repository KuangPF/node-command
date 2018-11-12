const Metalsmith = require('metalsmith')
const Layouts = require('metalsmith-layouts')
const markdown = require('metalsmith-markdown')
const permalinks  = require('metalsmith-permalinks');

Metalsmith(__dirname)
  .metadata({
    title: 'static site demo',
    description: 'generate satic site with metalsmith',
    author: 'KuangPF'
  })
  .source('./src')
  .destination('./build')
  .clean(true)
  .use(markdown())
  .use(permalinks())
  .use(Layouts({
    engine: 'handlebars'
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });