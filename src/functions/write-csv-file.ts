import * as fs from 'fs'

function getHeaderRow(row: { [key: string]: string }) {
  return Object.keys(row).map(header => `"${header}"`).join(',')
}

function getDataRow(row: { [key: string]: string }) {
  return Object.values(row).join(',')
}

export function writeCsvFile(
  csv: { [key: string]: string }[], file: string, update: (percent: number) => void = () => 0
) {
  const stream = fs.createWriteStream(file)
  stream.write(getHeaderRow(csv[0]) + '\n')
  csv.map(row => getDataRow(row) + '\n').forEach((line, i) => {
    stream.write(line)
    update(csv.length / i * 100)
  })
  stream.close()
}
