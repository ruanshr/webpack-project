module.exports = function txtLoader(source) {
  this.cacheable && this.cacheable()
  return source
}