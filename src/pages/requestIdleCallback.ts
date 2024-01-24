export function prepare() {

}

export function run () {
  loadDomWithRequestIdleCallback()
}


const total = 100000
function loadDom() {
  const container = document.querySelector("#container");
  let now = Date.now();

  for (let i = 0 ; i < total; i++) {
    const $div = document.createElement("div")
    $div.innerText = Math.random().toString().slice(2, 1000)
    container.append($div)
  }
  console.log(`JS time: ${Date.now() - now} ms`)

  setTimeout(() => {
    console.log(`render and Js time ${Date.now() - now} ms`)
  })
}


function loadDomWithRequestIdleCallback() {

  const container = document.querySelector("#container")
  const button = document.createElement("button")
  button.innerText = "ttttt"
  button.addEventListener("click", () => {
    alert(1)
  })
  container.insertBefore(button, null)
  let chunk = 20;
  let page = total / chunk;
  let index = 0;
  function loop(curTotal, curIndex) {
    if (curTotal <= 0) {
      return false
    }
    let pageCount = Math.min(curTotal, chunk)
    window.requestAnimationFrame(function (...args) {
      console.log(Date.now(), args)
      for (let i = 0; i < pageCount; i ++) {
        const $div = document.createElement("div")
        $div.innerText = `${i} - ${Math.random().toString().slice(2, 1000)}`
        container.append($div)
      }
      loop(curTotal - pageCount, curIndex + pageCount)
    })
  }
  loop(total, index)
}