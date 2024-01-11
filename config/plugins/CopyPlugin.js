const child_process = require('child_process')
class CopyPlgin {
  constructor() {}

  apply(compiler) {
    compiler.hooks.done.tap('Copy', () => {
      child_process.spawn('cp', ['./dist/*', './public'])
    })
  }
}

module.exports = CopyPlgin
