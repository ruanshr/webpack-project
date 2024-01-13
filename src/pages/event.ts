export function prepare() {}

export function run() {
  const container = document.querySelector('.container')
  const box = document.querySelector('.box')
  container.addEventListener(
    'click',
    (e) => {
      console.log('parent', '1', Date.now())
    },
    { capture: true }
  )
  container.addEventListener(
    'click',
    (e) => {
      console.log('parent', '2', Date.now())
    },
    { capture: false }
  )
  container.addEventListener(
    'click',
    (e) => {
      console.log('parent', '3', Date.now())
    },
    { capture: true }
  )
  box.addEventListener(
    'click',
    (e) => {
      console.log('child', 4)
    },
    {
      capture: false
    }
  )

  box.addEventListener(
    'click',
    (e) => {
      e.stopPropagation()
      console.log('child', 5)
    },
    {
      capture: true
    }
  )
}
