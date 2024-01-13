export function prepare() {}

export function run() {
  document.querySelector('#btn').addEventListener('click', () => {
    startDownload()
  })
}

function startDownload() {
  const url = '/imgs/练习题库.rar'
  downloadFile(url, `练习题库${Date.now()}.rar`)
}

async function downloadFile(url, fileName) {
  // const CHUNK_SIZE = 1024 * 1024 * 10 // 每次下载10MB
  const CHUNK_SIZE = 1024 * 10
  const response = await fetch(url, { method: 'head' })
  const contentRange = response.headers.get('content-range')
  const fileSize = contentRange
    ? Number(contentRange.split('/')[1])
    : Number(response.headers.get('content-length'))
  const fileStream = []
  let offset = 0

  while (offset < fileSize) {
    const end = Math.min(offset + CHUNK_SIZE, fileSize)
    const options: RequestInit = {
      headers: { Range: `bytes=${offset}-${end - 1}` },
      mode: "no-cors",
      referrerPolicy: "no-referrer",
    }
    const blob = await fetch(url, options).then((res) => res.blob())
    fileStream.push(blob)
    offset = end
  }

  const blob = new Blob(fileStream, { type: response.headers.get('content-type') })

  downloadFile2(blob, fileName)
  // const img = document.createElement('img')

  // img.src = URL.createObjectURL(blob)
  // document.body.append(img)
  // debugger
}

function downloadFile2(blob, fileName) {
  const aElement = document.createElement('a')
  aElement.setAttribute('download', fileName)
  const href = URL.createObjectURL(blob)
  aElement.href = href
  aElement.setAttribute('target', '_blank')
  aElement.click()
  URL.revokeObjectURL(href)
}
