function askQuestion(prams1) {
  return (name, done) => {
    console.log(name)
    done()
  }
}

askQuestion(1)