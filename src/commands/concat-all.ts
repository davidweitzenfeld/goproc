import {Command, flags} from '@oclif/command'
import * as path from 'path'
import {findGroupFiles} from '../functions/find-group-files'
import {concat} from '../functions/concat'
import {cli} from 'cli-ux'
import {findFileGroups} from '../functions/find-file-groups'
import {formatString} from '../functions/format-string'
import {sortByString} from '../utils/sort-by-string'

export default class ConcatAll extends Command {
  static description = 'concat all GoPro video groups in a directory'

  static examples = [
    '$ goproc concat-all',
  ]

  static flags = {
    inputDir: flags.string({char: 'd', description: 'directory to search'}),
    outputDir: flags.string({char: 'o', description: 'output directory for concatenated files'}),
    outputNameFormat: flags.string({char: 'f', description: 'concatenated files name format'}),
    recursive: flags.boolean({
      char: 'r',
      description: 'search inputDir recursively',
      default: true,
      allowNo: true,
    }),
    dryRun: flags.boolean({description: 'run without making any changes'}),
    help: flags.help({char: 'h'}),
  }

  static args = []

  async run() {
    const {flags} = this.parse(ConcatAll)

    const currentDir = process.cwd()
    const inputDir = flags.inputDir ?? currentDir
    const outputDir = flags.outputDir ?? currentDir
    const outputNameFormat = flags.outputNameFormat ?? '${prefix}00${suffix}'
    const recursive = flags.recursive
    const dryRun = flags.dryRun ?? false

    const groups = await Promise.all((await findFileGroups(inputDir, recursive))
      .map(group => findGroupFiles(inputDir, recursive, group[0], group[1]).then(files => ([group, files]))))
    if (groups.length > 0) {
      this.log(`Found ${groups.length} file groups: ${groups.map(group => `'${group[0][0]}*${group[0][1]}'`).join(' ')}.`)
      for (const group of groups.sort(sortByString(group => `'${group[0][0]}*${group[0][1]}'`))) {
        const outputFileName = formatString(outputNameFormat, {
          prefix: group[0][0],
          suffix: group[0][1],
        }) + '.MP4'
        const output = path.join(outputDir, outputFileName)
        this.log(`Processing group '${group[0][0]}*${group[0][1]}', ${group[1].length} file(s): ${group[1].map(file => `'${file}'`).join(' ')}.`)
        const progbar = cli.progress({format: 'Concatenating... [{bar}] {value}%'})
        progbar.start(100, 0)
        const concatFile = dryRun ? output :
          // eslint-disable-next-line no-await-in-loop
          await concat(group[1].map(file => path.isAbsolute(file) ? file : path.join(inputDir, file)),
            output, percent => progbar.update(percent))
        progbar.update(100)
        progbar.stop()
        this.log(`Done. Created '${concatFile}'.`)
      }
      this.log(`Done. Processed ${groups.length} groups.`)
    } else {
      this.log('Found no files.')
    }
  }
}
