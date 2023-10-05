import { INITIAL_STATE } from './index'

export function filterPayload<T extends object>(
  payload: Partial<T>,
  fieldName: keyof typeof INITIAL_STATE
): Partial<T> {
  const targetField = INITIAL_STATE[fieldName]

  if (targetField == null) {
    throw new Error(`${fieldName} does not exist in auth store.`)
  }

  if (typeof targetField !== 'object') {
    throw new Error(`${fieldName} must be an object in the store.`)
  }

  return Object.entries(payload).reduce((accumulator, [key, value]) => {
    if (key in targetField) {
      accumulator[key] = value
    }
    return accumulator
  }, Object.create(null))
}
