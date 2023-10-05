import { INITIAL_STATE } from './index'

const actionTypes = {
  SET_USER: 'SET_USER',
  REMOVE_USER: 'REMOVE_USER',
} as const

export type ActionTypes =
  | {
      type: typeof actionTypes.SET_USER
      payload: Partial<typeof INITIAL_STATE.user>
    }
  | { type: typeof actionTypes.REMOVE_USER }

export default actionTypes
