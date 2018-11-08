const Metalsmith = require('metalsmith')
const path = require('path')
console.log(path.resolve(__dirname))
console.log(Metalsmith(path.resolve(__dirname)))