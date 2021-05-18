<<<<<<< HEAD
module.exports = function txtLoader(source) {

    this.callback({ source : source })
=======
module.exports = function txtLoader(source) {
  debugger
  this.cacheable && this.cacheable()
  return source

>>>>>>> 8eda7beaa314f8d0fbdd1edca1041e88e39c0000
}