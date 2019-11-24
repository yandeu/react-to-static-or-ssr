import React, { createContext, useReducer, FunctionComponent, useContext } from 'react'
import { reducer } from './reducers'

interface Action {
  type: string
  payload: any
}

interface ClientStore {
  dispatch: Function
  state: any
}

interface ServerStore {
  dispatch: Function
}

interface WithStore {
  loadData?: Function
  component: () => JSX.Element
}

// some initial state for testing
const INITIAL_STATE = {
  name: 'NAME PLACEHOLDER',
  test: 123,
  address: 'Main Street'
}

// @ts-ignore
export const Store = createContext()
export const StoreConsumer = Store.Consumer

export const StoreProvider: FunctionComponent<{ initialState: any }> = props => {
  let { children, initialState } = props

  initialState = { ...INITIAL_STATE, ...initialState }

  const [state, Dispatch] = useReducer(reducer, initialState)
  const dispatch = async (action: Function) => Dispatch(await action())

  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}

// this is only used for server side data fetching
// it imitates the real store's name
export const serverStore: ServerStore = {
  dispatch: async action => {
    return reducer(null, await action())
  }
}

export const clientStore = (): ClientStore => useContext(Store)

// structures an component to be used with react-router-config
export const withStore = (component: (args?: any) => JSX.Element, params?: { loadData: Function }): WithStore => {
  return { component, ...params }
}

// does just destructure a component wrapped with withStore()
export const routeStore = (componentWithStore: WithStore) => {
  return {
    component: componentWithStore.component,
    loadData: componentWithStore.loadData
  }
}
