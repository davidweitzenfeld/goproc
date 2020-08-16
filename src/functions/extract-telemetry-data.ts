import * as gpmfExtract from 'gpmf-extract'
import * as fs from 'fs'

// eslint-disable-next-line valid-jsdoc
/**
 * @param {*} path The path to video file
 * @param {*} chunkSize As of August 9, 2020, there is a problem with mp4box.js,
 * so please specify a sufficiently large chunksize for the file size.
 * @return {Function}
 */
function bufferAppender(path: string, chunkSize: number) {
  return function (mp4boxFile: any) {
    const stream = fs.createReadStream(path, {highWaterMark: chunkSize})
    let bytesRead = 0
    stream.on('end', () => {
      mp4boxFile.flush()
    })
    stream.on('data', chunk => {
      const arrayBuffer = new Uint8Array(chunk as ArrayBufferLike).buffer;
      (arrayBuffer as any).fileStart = bytesRead
      mp4boxFile.appendBuffer(arrayBuffer)
      bytesRead += chunk.length
    })
    stream.resume()
  }
}

export async function extractTelemetryData(path: string, update: (percent: number) => void) {
  const file = bufferAppender(path, 10 * 1024 * 1024)
  return gpmfExtract(file, false, update)
}
