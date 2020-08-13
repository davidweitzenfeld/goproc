import {Command, flags} from '@oclif/command'
import * as path from 'path'
import {cli} from 'cli-ux'
import {extractTelemetryData} from '../functions/extract-telemetry-data'
import {processTelemetryData} from '../functions/process-telemetry-data'
import * as fs from 'fs'
import {removeVideoTrack} from '../functions/remove-video-track'

export default class ExtractTelemetry extends Command {
  static description = 'extract telemetry data from a GoPro video file'

  static examples = [
    '$ goproc extract-telemetry GX010043.MP4',
  ]

  static flags = {
    dryRun: flags.boolean({description: 'run without making any changes'}),
    help: flags.help({char: 'h'}),
  }

  static args = [
    {name: 'file'},
    {name: 'output'},
  ]

  async run() {
    const {args, flags} = this.parse(ExtractTelemetry)

    const input = args.file as string
    const output = args.output ?? input.replace(path.extname(input), '') + '.csv'
    const dryRun = flags.dryRun ?? false

    const noVideoFile = input.replace(path.extname(input), '') + '.temp.MP4'
    this.log(`Creating temp MP4 file for data extraction '${noVideoFile}'...`)
    const progbar1 = cli.progress({format: 'Creating... [{bar}] {value}%'})
    progbar1.start(100, 0)
    if (!dryRun) await removeVideoTrack(input, noVideoFile, percent => progbar1.update(percent))
    progbar1.update(100)
    progbar1.stop()

    this.log('Done. Using temp file for telemetry data extraction...')

    const progbar2 = cli.progress({format: 'Extracting... [{bar}] {value}%'})
    progbar2.start(100, 0)
    const data = dryRun ? {} : await extractTelemetryData(noVideoFile, percent => progbar2.update(percent))
    progbar2.update(100)
    progbar2.stop()

    this.log(`Done. Removing temp MP4 file '${noVideoFile}'...`)
    if (!dryRun) fs.unlinkSync(noVideoFile)
    this.log('Done! Processing extracted telemetry data...')

    const progbar3 = cli.progress({format: 'Processing... [{bar}] {value}%'})
    progbar3.start(100, 0)
    const telemetry = await processTelemetryData(data, percent => progbar3.update(percent))
    progbar3.update(100)
    progbar3.stop()
    this.log('Done. Writing telemetry data to file...')

    const gpsTelemetry = telemetry[Object.keys(telemetry).find(k => k.includes('GPS'))!!]
    if (!dryRun) fs.writeFileSync(output, gpsTelemetry)
    this.log(`Wrote telemetry data to file '${output}'.`)
  }
}
