function callbackDemo(name,done) {
  console.log(name)
  let a = 'callback'
  done(a)
}

callbackDemo('namefff',function(e) {
  console.log(e) // name callback
})