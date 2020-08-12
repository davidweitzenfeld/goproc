import * as fs from 'fs'

export async function findGroupFiles(dir: string, prefix: string, suffix: string, extension = 'MP4'): Promise<string[]> {
  const regex = new RegExp(`${prefix}\\d{2}${suffix}\\.${extension}`)
  return (await fs.promises.readdir(dir)).filter(filePath => regex.test(filePath))
}
