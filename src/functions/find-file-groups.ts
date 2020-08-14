import * as fs from 'fs'
import * as path from 'path'
import {notNull} from '../utils/filter-not-null'
import * as recursiveReadDir from 'recursive-readdir'

export async function findFileGroups(dir: string, recursive: boolean): Promise<[string, string][]> {
  const regex = /^(GX|GH)\d{2}(\d{4})\.\w+$/
  const readdir = async (dir: string) => recursive ? recursiveReadDir(dir) : fs.promises.readdir(dir)
  const groups = (await readdir(dir))
    .map(file => path.basename(file))
    .map(file => file.match(regex))
    .filter(notNull)
    .map(match => ([match[1], match[2]]))
  // FIXME: Improve de-duping code.
  return groups.filter((group, i) =>
    groups.map(it => it[0] + it[1]).findIndex(it => it === group[0] + group[1]) === i) as [string, string][]
}
