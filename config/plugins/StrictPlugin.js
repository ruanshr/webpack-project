class StrictPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('strictPlugin', (compilation, callback) => {
      Object.keys(compilation.assets).forEach((assetName) => {
        const assetContent = compilation.assets[assetName].source()
        // if (assetContent.includes('use strict')) {
        //   // 如果输出文件中已经包含"use strict"，则跳过该文件
        //   return
        // }
        compilation.assets[assetName] = {
          source: () => `'ruansr';\n${assetContent}`,
          size: () => compilation.assets[assetName].size() + 14 // 14 是"use strict"; 的长度
        }
      })
      callback()
    })
  }
}

module.exports = StrictPlugin
