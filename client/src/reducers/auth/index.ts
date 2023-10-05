import { proxy, snapshot, subscribe, useSnapshot } from 'valtio'

import keys from '../../assets/strings/keys'
import actionTypes, { ActionTypes } from './action-types'
import { filterPayload } from './helpers'

interface InitialState {
  __version: string
  isAuthenticated: boolean
  user: {
    id: number | undefined
    uuid: string | undefined
    role: string | undefined
  }
}

export const INITIAL_STATE: InitialState = {
  __version: process.env.NEXT_PUBLIC_CACHE_VERSION ?? '1',
  isAuthenticated: false,
  user: {
    id: undefined,
    uuid: undefined,
    role: undefined,
  },
}

const PERSISTENT_KEY = keys.AUTH

let persistedState = null
try {
  persistedState = JSON.parse(
    window.localStorage.getItem(PERSISTENT_KEY) as string
  ) as typeof INITIAL_STATE
  if (persistedState?.__version !== INITIAL_STATE.__version) {
    persistedState = null
    window.localStorage.removeItem(PERSISTENT_KEY)
  }
} catch (_) {}

const store = proxy(
  persistedState ?? {
    ...INITIAL_STATE,
  }
)

export async function reducer(action: ActionTypes) {
  switch (action.type) {
    case actionTypes.SET_USER: {
      store.isAuthenticated = true
      store.user = {
        ...store.user,
        ...filterPayload(action.payload, 'user'),
      }
      return snapshot(store)
    }

    case actionTypes.REMOVE_USER: {
      store.isAuthenticated = false
      store.user = JSON.parse(JSON.stringify(INITIAL_STATE.user))
      return snapshot(store)
    }

    default: {
      return store
    }
  }
}

export function getState(key: keyof typeof INITIAL_STATE) {
  const state = snapshot(store)
  return key == null ? state : state[key]
}

export function useState() {
  return useSnapshot(store)
}

subscribe(store, function () {
  localStorage.setItem(PERSISTENT_KEY, JSON.stringify(store))
})
