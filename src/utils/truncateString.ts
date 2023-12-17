export const truncateString = (str: string) => {
  if (str.length <= 12) {
    return str // No truncation needed if the string is short
  }
  const start = str.substring(0, 6) // Get first 6 characters
  const end = str.substring(str.length - 6) // Get last 6 characters
  return `${start}..${end}`
}
