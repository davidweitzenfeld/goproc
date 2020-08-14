export function formatString(template: string, variables: { [key: string]: string }) {
  const regex = /\${\w+}/g
  const getKey = (str: string) => str.substring(2, str.length - 1)
  return [...template.matchAll(regex)]
    .reduce((str, repl) => str.replace(repl[0], variables[getKey(repl[0])]), template)
}
