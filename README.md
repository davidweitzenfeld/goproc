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
goproc/0.1.0 win32-x64 node-v14.7.0
$ goproc --help [COMMAND]
USAGE
  $ goproc COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`goproc concat [GROUPPREFIX] [GROUPSUFFIX]`](#goproc-concat-groupprefix-groupsuffix)
* [`goproc hello [FILE]`](#goproc-hello-file)
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

_See code: [src\commands\concat.ts](https://github.com/davidweitzenfeld/goproc/blob/v0.1.0/src\commands\concat.ts)_

## `goproc hello [FILE]`

describe the command here

```
USAGE
  $ goproc hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ goproc hello
  hello world from ./src/hello.ts!
```

_See code: [src\commands\hello.ts](https://github.com/davidweitzenfeld/goproc/blob/v0.1.0/src\commands\hello.ts)_

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
