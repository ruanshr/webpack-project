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
  const worker = new Worker(new URL('../worker/chunk.ts', import.meta.url), { type: "module" })
  worker.addEventListener('message', (e) => {
    const result = e.data
    if (result.type === 'compose') {
      const { fileStream, contentType } = result
      const blob = new Blob(fileStream, { type: contentType })
      downloadFile2(blob, fileName)
    }
  })

  worker.postMessage({ type: 'chunk', url })

  // while (offset < fileSize) {
  //   const end = Math.min(offset + CHUNK_SIZE, fileSize)
  //   const options: RequestInit = {
  //     headers: { Range: `bytes=${offset}-${end - 1}` },
  //     mode: "no-cors",
  //     referrerPolicy: "no-referrer",
  //   }
  //   const blob = await fetch(url, options).then((res) => res.blob())
  //   fileStream.push(blob)
  //   offset = end
  // }

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
