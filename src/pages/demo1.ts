export function prepare() {
  const container = document.createElement("div")
  container.style.backgroundColor = "yellow"
  container.style.overflow = "auto"
  container.style.height = "400px"
  container.setAttribute("id", "list-container")
  document.body.append(container);
}
export function run() {
  // 虚拟列表容器
  var container = document.querySelector('#list-container')

  // 列表项高度
  var itemHeight = 50

  // 可见区域高度
  var visibleHeight = container.clientHeight

  // 数据总数
  var totalItems = 1000
  
  var scrollHeight = Math.max(0, itemHeight * totalItems - visibleHeight)
  container.scrollTop = scrollHeight;
  // 渲染的起始索引和结束索引
  var startIndex = 0
  var endIndex = Math.ceil(visibleHeight / itemHeight) + 3

  // 滚动事件处理函数
  function handleScroll() {
    // 计算当前滚动位置对应的起始索引和结束索引
    startIndex = Math.floor(container.scrollTop / itemHeight)
    endIndex = Math.min(startIndex + Math.ceil(visibleHeight / itemHeight), totalItems)

    // 更新列表内容
    renderList()
  }

  // 渲染列表项
  function renderList() {
    // 清空容器内容
    container.innerHTML = ''

    // 创建文档片段
    var fragment = document.createDocumentFragment()

    // 根据起始索引和结束索引渲染可见区域的列表项
    for (var i = startIndex; i < endIndex; i++) {
      var item = document.createElement('div')
      item.style.height = `${itemHeight}px`
      item.style.backgroundColor = "#" + Math.random().toString(16).slice(2, 8)
      item.className = 'list-item'
      item.textContent = 'Item ' + i
      item.style.top = i * itemHeight + 'px'
      fragment.appendChild(item)
    }

    // 将文档片段添加到容器中
    container.appendChild(fragment)
  }

  // 初始化列表
  renderList()

  // 监听滚动事件
  container.addEventListener('scroll', handleScroll)
}
