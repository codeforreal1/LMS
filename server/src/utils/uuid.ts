import { nanoid } from 'napi-nanoid';

export function generateAlphanumericUUID(): string {
  return nanoid();
}
