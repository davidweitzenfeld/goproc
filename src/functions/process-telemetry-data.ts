import * as goproTelemetry from 'gopro-telemetry'

export async function processTelemetryData(data: any, update: (percent: number) => void) {
  return goproTelemetry(data, {
    preset: 'csv',
    progress: (progress: number) => update(progress * 100),
  })
}
