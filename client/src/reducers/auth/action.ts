import { reducer, INITIAL_STATE } from './index'
import actionTypes from './action-types'

export function setAuthUser(payload: Partial<typeof INITIAL_STATE.user>) {
  if (payload == null || typeof payload !== 'object') {
    throw new Error('payload must be an object')
  }
  return reducer({
    type: actionTypes.SET_USER,
    payload,
  })
}

export function removeAuthUser() {
  return reducer({
    type: actionTypes.REMOVE_USER,
  })
}
