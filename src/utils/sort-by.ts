export function sortBy<T>(extractor: (item: T) => number): (a: T, b: T) => number {
  return (a, b) => extractor(a) - extractor(b)
}
