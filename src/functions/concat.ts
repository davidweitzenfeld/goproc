import {execCmd} from './exec-cmd'

// eslint-disable-next-line valid-jsdoc
/**
 * Calculates percentages based on MP4Box output progress bars and pushes them via callback.
 */
function percentageCalculator(
  fileCount: number, percentageCallback: (percent: number) => void
): (str: string) => void {
  const progressRegex = /(\d{2,3})\/100/ // Regex used to extract progress from MP4Box output.
  const barCount = 4 + fileCount // Number of bars MP4Box displays.

  let count = 1
  let prevPercent = 0

  return str => {
    const percentStr = str.match(progressRegex)?.[1]
    if (typeof percentStr !== 'undefined') {
      const percent = Number.parseInt(percentStr, 0)
      if (percent < prevPercent) count++
      percentageCallback(Math.round((100 / barCount * (count - 1)) + (percent / barCount)))
      prevPercent = percent
    }
  }
}

export async function concat(
  inputFiles: string[], outputFile: string, percentageCallback: (percent: number) => void
) {
  const catInputFiles = inputFiles.slice(1, inputFiles.length).map(path => `-cat "${path}"`).join(' ')
  await execCmd(`MP4Box -add "${inputFiles[0]}" ${catInputFiles} "${outputFile}"`,
    percentageCalculator(inputFiles.length, percentageCallback))
  return outputFile
}
