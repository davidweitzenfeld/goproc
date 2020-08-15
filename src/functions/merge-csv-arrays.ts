import * as _ from 'lodash'
import {sortBy} from '../utils/sort-by'

function csvArrayToDict(array: string[][]): { [key: string]: string }[] {
  const headers = array[0].map(header => header.substring(1, header.length - 1))
  const data = array.splice(1)
  return data.map(row => row.reduce((dict, item, i) => ({...dict, [headers[i]]: item}), {}))
}

export function mergeCsvArrays(
  arrays: string[][][], backfill: boolean, update: (percent: number) => void = () => 0
): { [key: string]: string }[] {
  const csvs = arrays.map(array => csvArrayToDict(array))
  const keys = [...new Set(csvs.flatMap(csv => Object.keys(csv[0])))]
  const emptyRow = keys.reduce((row, key) => ({...row, [key]: ''}), {})
  const rows = csvs.flatMap(csv => csv)
  return rows.map(row => ({cts: '', ...row}) as { [key: string]: string })
    .sort(sortBy(row => parseFloat(row.cts.substring(1, row.cts.length - 1))))
    .reduce((arr, row, i) => {
      update(Math.round(i / rows.length * 100))
      const prevRow = _.last(arr) ?? {}
      arr.push({...emptyRow, ...(backfill ? prevRow : {}), ...row})
      return arr
    }, [] as { [key: string]: string }[])
}
