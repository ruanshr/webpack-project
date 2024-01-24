import { prepare, run } from './pages/requestIdleCallback'

prepare()

document.addEventListener('DOMContentLoaded', () => {
  run()
})
