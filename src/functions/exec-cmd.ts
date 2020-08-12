import {exec} from 'child_process'

export function execCmd(cmd: string) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout) => {
      if (error) reject(error)
      else resolve(stdout)
    })
  })
}
