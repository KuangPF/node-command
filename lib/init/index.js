const execa = require('execa')
const binPath = require.resolve('../ivue-cli/bin/ivue-init')
console.log(process.argv.slice(process.argv.indexOf('init') + 1))
/* execa(
  binPath,
  process.argv.slice(process.argv.indexOf('init') + 1),
  { stdio: 'inherit' }
) */
execa("echo",["hello world"]).then(result => {
  
});