import {execCmd} from './exec-cmd'

export async function concat(inputFiles: string[], outputFile: string) {
  const catInputFiles = inputFiles.slice(1, inputFiles.length).map(path => `-cat "${path}"`).join(' ')
  await execCmd(`MP4Box -add "${inputFiles[0]}" ${catInputFiles} "${outputFile}"`)
  return outputFile
}
