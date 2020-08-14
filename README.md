goproc
======

GoPro video file processing CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/goproc.svg)](https://npmjs.org/package/goproc)
[![Downloads/week](https://img.shields.io/npm/dw/goproc.svg)](https://npmjs.org/package/goproc)
[![License](https://img.shields.io/npm/l/goproc.svg)](https://github.com/davidweitzenfeld/goproc/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g goproc
$ goproc COMMAND
running command...
$ goproc (-v|--version|version)
goproc/0.0.0-development win32-x64 node-v14.7.0
$ goproc --help [COMMAND]
USAGE
  $ goproc COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`goproc concat [GROUPPREFIX] [GROUPSUFFIX]`](#goproc-concat-groupprefix-groupsuffix)
* [`goproc concat-all`](#goproc-concat-all)
* [`goproc extract-telemetry [FILE] [OUTPUT]`](#goproc-extract-telemetry-file-output)
* [`goproc help [COMMAND]`](#goproc-help-command)

## `goproc concat [GROUPPREFIX] [GROUPSUFFIX]`

concat a GoPro video group

```
USAGE
  $ goproc concat [GROUPPREFIX] [GROUPSUFFIX]

OPTIONS
  -d, --inputDir=inputDir  directory to search
  -h, --help               show CLI help
  -o, --output=output      concatenated output file
  --dryRun                 run without making any changes

EXAMPLE
  $ goproc concat GX 0043
```

_See code: [src\commands\concat.ts](https://github.com/davidweitzenfeld/goproc/blob/v0.0.0-development/src\commands\concat.ts)_

## `goproc concat-all`

concat all GoPro video groups in a directory

```
USAGE
  $ goproc concat-all

OPTIONS
  -d, --inputDir=inputDir                  directory to search
  -f, --outputNameFormat=outputNameFormat  concatenated files name format
  -h, --help                               show CLI help
  -o, --outputDir=outputDir                output directory for concatenated files
  -r, --recursive                          search inputDir recursively
  --dryRun                                 run without making any changes

EXAMPLE
  $ goproc concat-all
```

_See code: [src\commands\concat-all.ts](https://github.com/davidweitzenfeld/goproc/blob/v0.0.0-development/src\commands\concat-all.ts)_

## `goproc extract-telemetry [FILE] [OUTPUT]`

extract telemetry data from a GoPro video file

```
USAGE
  $ goproc extract-telemetry [FILE] [OUTPUT]

OPTIONS
  -h, --help  show CLI help
  --dryRun    run without making any changes

EXAMPLE
  $ goproc extract-telemetry GX010043.MP4
```

_See code: [src\commands\extract-telemetry.ts](https://github.com/davidweitzenfeld/goproc/blob/v0.0.0-development/src\commands\extract-telemetry.ts)_

## `goproc help [COMMAND]`

display help for goproc

```
USAGE
  $ goproc help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src\commands\help.ts)_
<!-- commandsstop -->
