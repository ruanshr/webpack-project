class StrictPlugin {
  apply(compiler) {
    compiler.hooks.make.tapAsync("tt", (compilation, ...args) => {
      console.log(compilation, "22", ...args, "----===")
      console.log('------------')
    })
  }
}

module.exports = StrictPlugin
