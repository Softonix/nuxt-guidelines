export function includesPattern (value: string, pattern: string | string[]) {
  if (Array.isArray(pattern)) {
    return pattern.some(p => value.includes(p))
  } else {
    return value.includes(pattern)
  }
}
