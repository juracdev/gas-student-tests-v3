export function clearStringSpaces(str: string): string {
  return str.trim().replace(/\s{2,}/gi, ' ');
}

export function upperFirstLetter(str: string): string {
  return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
}
