class AppSocket {
  constructor(...args) {
    // 创建WebSocket对象
    var socket = new WebSocket('ws://localhost:8080')

    // 连接成功时的回调函数
    socket.onopen = function () {
      console.log('WebSocket连接已打开')

      // 发送消息给服务器
      socket.send('Hello server!')
    }

    // 接收到消息时的回调函数
    socket.onmessage = function (event) {
      console.log('接收到服务器消息：' + event.data)
    }

    // 连接关闭时的回调函数
    socket.onclose = function (event) {
      console.log('WebSocket连接已关闭，关闭代码：' + event.code)
    }

    // 发生错误时的回调函数
    socket.onerror = function (error) {
      console.log('WebSocket错误：' + error)
    }
  }
}

function createAppSocketInstance() {
  function getSingleAppSocket() {
    let instance
    const ProxySocket = new Proxy(AppSocket, {
      construct(target, args, newTarget) {
        if (instance) {
          return instance
        }
        instance = new AppSocket(...args)
        return instance;
      }
    })
    ProxySocket.prototype.constructor = ProxySocket;
    return ProxySocket;
  }
  const ProxySocket = getSingleAppSocket();
  return new ProxySocket()
}

export const appSocket = createAppSocketInstance()
