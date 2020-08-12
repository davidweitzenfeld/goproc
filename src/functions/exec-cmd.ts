/* eslint-disable indent */
import {spawn} from 'child_process'

async function echoReadable(readable: AsyncIterable<string>, callback: (str: string) => void) {
  for await (const line of readable) {
    callback(line.toString())
  }
}

export function execCmd(cmd: string, callback: (str: string) => void) {
  return new Promise(resolve => {
    const proc = spawn(cmd, {
      shell: true,
      detached: false,
      stdio: ['ignore', 'pipe', 'pipe'],
    })

    Promise.all([echoReadable(proc.stdout, callback), echoReadable(proc.stderr, callback)])
      .then(() => resolve())
  })
}
