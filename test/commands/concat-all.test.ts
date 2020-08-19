import {expect, test} from '@oclif/test'
import * as fs from 'fs'
import * as path from 'path'
import * as mockSpawn from 'mock-spawn'

const initialWd = process.cwd()
before(async () => {
  if (!fs.existsSync('test-wd')) fs.mkdirSync('test-wd')
  fs.writeFileSync('test-wd/GX010043.MP4', '')
  fs.writeFileSync('test-wd/GX020043.MP4', '')
  fs.writeFileSync('test-wd/GH010100.MP4', '')
  fs.writeFileSync('test-wd/GH020100.MP4', '')
  fs.writeFileSync('test-wd/GH010001.MP4', '')
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

describe('concat-all', () => {
  test
    .stdout()
    .command(['concat-all'])
    .it('runs concat-all', ctx => {
      const files = [
        [path.join(process.cwd(), 'GH010001.MP4')],
        [path.join(process.cwd(), 'GH010100.MP4'), path.join(process.cwd(), 'GH020100.MP4')],
        [path.join(process.cwd(), 'GX010043.MP4'), path.join(process.cwd(), 'GX020043.MP4')],
      ]
      const outputs = [
        path.join(process.cwd(), 'GH000001.MP4'),
        path.join(process.cwd(), 'GH000100.MP4'),
        path.join(process.cwd(), 'GX000043.MP4'),
      ]
      expect(spawn.calls[0].command).to.equal(`MP4Box -add "${files[0][0]}"  "${outputs[0]}"`)
      expect(spawn.calls[1].command).to.equal(`MP4Box -add "${files[1][0]}" -cat "${files[1][1]}" "${outputs[1]}"`)
      expect(spawn.calls[2].command).to.equal(`MP4Box -add "${files[2][0]}" -cat "${files[2][1]}" "${outputs[2]}"`)
      expect(ctx.stdout).to.contain(`Processing group 'GH*0001', 1 file(s): '${files[0][0]}'.`)
      expect(ctx.stdout).to.contain(`Done. Created '${outputs[0]}'.`)
      expect(ctx.stdout).to.contain(`Processing group 'GH*0100', 2 file(s): '${files[1][0]}' '${files[1][1]}'.`)
      expect(ctx.stdout).to.contain(`Done. Created '${outputs[1]}'.`)
      expect(ctx.stdout).to.contain(`Processing group 'GX*0043', 2 file(s): '${files[2][0]}' '${files[2][1]}'.`)
      expect(ctx.stdout).to.contain(`Done. Created '${outputs[2]}'.`)
    })
})
