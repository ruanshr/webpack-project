const CHUNK_SIZE = 1024 * 10 * 1024

async function chunkRequest(url, { chunk, fileSize }) {
  const offset = chunk * CHUNK_SIZE
  const end = Math.min(offset + CHUNK_SIZE, fileSize)
  console.log(offset, end)
  const options: RequestInit = {
    headers: { Range: `bytes=${offset}-${end - 1}` }
  }
  const blob = await fetch(url, options).then((res) => res.blob())
  return blob
}

async function getContentLength(url) {
  const response = await fetch(url, { method: 'head' })
  const contentRange = response.headers.get('content-range')
  const fileSize = contentRange
    ? Number(contentRange.split('/')[1])
    : Number(response.headers.get('content-length'))
  const chunks = Math.ceil(fileSize / CHUNK_SIZE)

  const contentType = response.headers.get('content-type')
  return { chunks, fileSize, contentType }
}

function loadChunks(url) {
  return new Promise<any>(async (resolve, reject) => {
    const fileStream = []
    try {
      const { chunks, fileSize, contentType } = await getContentLength(url)
      for (let i = 0; i < chunks; i++) {
        const blob = await chunkRequest(url, { chunk: i, fileSize })
        fileStream[i] = blob
      }
      resolve({ contentType, fileStream })
    } catch (e) {
      reject(e)
    }
  })
}

self.addEventListener('message', async (e) => {
  const options = e.data
  if (options.type == 'chunk') {
    const { url, chunk, fileSize } = options
    try {
      const result = await loadChunks(url)
      self.postMessage({ type: 'compose', ...result })
    } catch (e) {}
  }
})
