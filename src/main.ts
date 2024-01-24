import { prepare, run } from './pages/chunk_download'

prepare()

document.addEventListener('DOMContentLoaded', () => {
  run()
})
