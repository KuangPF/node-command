const program = require('commander')
console.log('sss')

program
  .usage('<template-name> [project-name]')
  .option('-c, --clone', 'use git clone')
  .option('--offline', 'use cached template')
  
program.parse(process.argv)