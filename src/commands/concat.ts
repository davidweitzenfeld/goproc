import {Command, flags} from '@oclif/command'
import * as path from 'path'
import {findGroupFiles} from '../functions/find-group-files'
import {concat} from '../functions/concat'
import {cli} from 'cli-ux'

export default class Concat extends Command {
  static description = 'concat a GoPro video group'

  static examples = [
    '$ goproc concat GX 0043',
  ]

  static flags = {
    inputDir: flags.string({char: 'd', description: 'directory to search'}),
    output: flags.string({char: 'o', description: 'concatenated output file'}),
    dryRun: flags.boolean({description: 'run without making any changes'}),
    help: flags.help({char: 'h'}),
  }

  static args = [
    {name: 'groupPrefix'},
    {name: 'groupSuffix'},
  ]

  async run() {
    const {args, flags} = this.parse(Concat)

    const currentDir = process.cwd()
    const inputDir = flags.inputDir ?? currentDir
    const output = flags.output ?? `${args.groupPrefix}00${args.groupSuffix}.MP4`
    const dryRun = flags.dryRun ?? false

    const files = await findGroupFiles(inputDir, false, args.groupPrefix, args.groupSuffix)
    if (files.length > 0) {
      this.log(`Found ${files.length} files: ${files.map(file => `'${file}'`).join(' ')}. Concatenating...`)
      const progbar = cli.progress({format: 'Concatenating... [{bar}] {value}%'})
      progbar.start(100, 0)
      const concatFile = dryRun ? output : await concat(files.map(file => path.join(inputDir, file)),
        output, percent => progbar.update(percent))
      progbar.update(100)
      progbar.stop()
      this.log(`Done. Created '${concatFile}'.`)
    } else {
      this.log('Found no files.')
    }
  }
}
