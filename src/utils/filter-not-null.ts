export function notNull<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && typeof value !== 'undefined'
}
