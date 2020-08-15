import * as fs from 'fs'
import * as recursiveReadDir from 'recursive-readdir'
import {sortBy} from '../utils/sort-by'

export async function findGroupFiles(
  dir: string, recursive: boolean, prefix: string, suffix: string, extension = 'MP4'
): Promise<string[]> {
  const regex = new RegExp(`${prefix}(\\d{2})${suffix}\\.${extension}`)
  const readdir = async (dir: string) => recursive ? recursiveReadDir(dir) : fs.promises.readdir(dir)
  return (await readdir(dir))
    .filter(filePath => regex.test(filePath))
    .sort(sortBy(filePath => parseInt(filePath.match(regex)![1], 0)))
}
