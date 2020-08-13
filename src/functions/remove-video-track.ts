import {execCmd} from './exec-cmd';

// eslint-disable-next-line valid-jsdoc
/**
 * Calculates percentages based on MP4Box output progress bars and pushes them via callback.
 */
function percentageCalculator(
  percentageCallback: (percent: number) => void
): (str: string) => void {
  const progressRegex = /(\d{2,3})\/100/ // Regex used to extract progress from MP4Box output.

  return str => {
    const percentStr = str.match(progressRegex)?.[1]
    if (typeof percentStr !== 'undefined') {
      const percent = Number.parseInt(percentStr, 0)
      percentageCallback(percent)
    }
  }
}

export async function removeVideoTrack(
  input: string, output: string, update: (percent: number) => void
): Promise<string> {
  await execCmd(`MP4Box -rem 1 "${input}" -out "${output}"`, percentageCalculator(update))
  return output
}
