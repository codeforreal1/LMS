// nanoid does not support ESM imports yet. So this workaround
const { customAlphabet } = require('nanoid');

export function generateAlphanumericUUID(size: number = 21): string {
  return customAlphabet(
    '0123456789abcdefghijklmnopqrstuvwABCDEFGHIJKLMNOPQRSTUVWXYZ',
    size,
  )();
}
