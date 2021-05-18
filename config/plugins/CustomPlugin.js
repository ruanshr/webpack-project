class CustomPlugin {
  constructor() {}

  apply(compiler) {
    compiler.hooks.emit.tap('CustomPlugin', (compliation) => {
      debugger
    })
  }
}

module.exports = CustomPlugin