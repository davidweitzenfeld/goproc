export function sortByString<T>(extractor: (item: T) => string): (a: T, b: T) => number {
  return (a, b) => extractor(a).localeCompare(extractor(b))
}
