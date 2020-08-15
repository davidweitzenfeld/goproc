import {expect, test} from '@oclif/test'
import * as fs from 'fs'
import * as path from 'path'
import * as mockSpawn from 'mock-spawn'

const initialWd = process.cwd()
before(async () => {
  if (!fs.existsSync('test-wd')) fs.mkdirSync('test-wd')
  fs.writeFileSync('test-wd/GX010043.MP4', '')
  fs.writeFileSync('test-wd/GX020043.MP4', '')
  process.chdir('test-wd')
})

after(async () => {
  process.chdir(initialWd)
  if (fs.existsSync('test-wd')) fs.rmdirSync('test-wd', {recursive: true})
})

const spawn = mockSpawn()
before(async () => {
  require('child_process').spawn = spawn
  spawn.setDefault(spawn.simple(0, 'hello world'))
})

describe('concat', () => {
  test
    .stdout()
    .command(['concat', 'GX', '0043'])
    .it('runs concat', ctx => {
      const files = [path.join(process.cwd(), 'GX010043.MP4'), path.join(process.cwd(), 'GX020043.MP4')]
      const output = 'GX000043.MP4'
      expect(spawn.calls[0].command).to.equal(`MP4Box -add "${files[0]}" -cat "${files[1]}" "${output}"`)
      expect(ctx.stdout).to.contain(`Found 2 files: '${files[0]}' '${files[1]}'.`)
      expect(ctx.stdout).to.contain(`Done. Created '${output}'.`)
    })
})
