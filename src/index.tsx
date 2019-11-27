import React from 'react'
import { hydrate, render } from 'react-dom'
import { renderRoutes } from 'react-router-config'
import routes from './routes'
import { BrowserRouter } from 'react-router-dom'
import { StoreProvider } from './store/store'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('#root not found!')

declare global {
  interface Window {
    INITIAL_STATE: any
  }
}

const initialState = window?.INITIAL_STATE || 'undefined'

const rootComponents = (
  <StoreProvider initialState={initialState}>
    <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
  </StoreProvider>
)

if (rootElement.hasChildNodes()) {
  hydrate(rootComponents, rootElement, () => {
    // [react-jss] We don't need the static css any more once we have launched our application.
    const ssStyles = document.getElementById('server-side-styles')
    if (ssStyles?.parentNode) ssStyles.parentNode.removeChild(ssStyles)
  })
} else {
  render(rootComponents, rootElement)
}
