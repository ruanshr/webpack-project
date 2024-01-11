class CustomPlugin {
  constructor() {}

  apply(compiler) {
    compiler.hooks.emit.tap('CustomPlugin', (compliation) => {
      console.log("33", compliation)
    })
  }
}

module.exports = CustomPlugin