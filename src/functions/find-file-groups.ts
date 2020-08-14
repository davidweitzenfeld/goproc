import * as fs from 'fs'
import {notNull} from '../utils/filter-not-null'

export async function findFileGroups(dir: string): Promise<[string, string][]> {
  const regex = /^(GX|GH)\d{2}(\d{4})\.\w+$/
  const groups = (await fs.promises.readdir(dir))
    .map(file => file.match(regex))
    .filter(notNull)
    .map(match => ([match[1], match[2]]))
  // FIXME: Improve de-duping code.
  return groups.filter((group, i) =>
    groups.map(it => it[0] + it[1]).findIndex(it => it === group[0] + group[1]) === i) as [string, string][]
}
