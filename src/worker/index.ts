// 在Worker线程中执行的代码逻辑
self.onmessage = function (event) {
  const result = event.data
  debugger
  console.log('99999999999999998888WW999999999', result)
  result.name = "333333"
  // 在Worker线程中处理逻辑 

  // 将结果发送回主线程
  self.postMessage(result)
}
