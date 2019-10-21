import express from 'express'
import compression from 'compression'
import path from 'path'
import fs from 'fs'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { renderRoutes, matchRoutes } from 'react-router-config'
import routes from '../../src/routes'

// @ts-ignore
import { JssProvider, SheetsRegistry } from 'react-jss'

import { Helmet } from 'react-helmet'
import indexHtml from '../lib/indexHtml'
import { StoreProvider } from '../../src/store/store'

let assets

const port = process.env.PORT || 3060
const app = express()

app.use(compression())

app.use('/static', express.static(path.resolve(__dirname, '../../dist/static')))

app.get('*', async (req, res) => {
  const context: { url?: string } = {}

  const sheets = new SheetsRegistry()

  // load async data
  const promises = matchRoutes(routes, req.url).map(({ route }) => {
    return route.loadData ? route.loadData() : null
  })

  // wait for all promises to load
  // and get all states from the async fetch requests
  let initialState = {}
  await Promise.all(promises)
    .then(results => {
      results.forEach(state => {
        if (state !== null) {
          if (Array.isArray(state)) {
            state.forEach(s => {
              initialState = { ...initialState, ...s }
            })
          } else initialState = { ...initialState, ...state }
        }
      })
    })
    .catch(error => console.error('ERROR: Promise.all(): ' + error.message))

  const html = ReactDOMServer.renderToString(
    <JssProvider registry={sheets}>
      <StoreProvider initialState={initialState}>
        <StaticRouter location={req.url} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </StoreProvider>
    </JssProvider>
  )

  const helmet = Helmet.renderStatic()

  if (context.url) {
    res.writeHead(302, {
      Location: context.url
    })
    res.end()
  } else {
    res.write(indexHtml(html, assets, sheets, helmet, initialState))
    res.end()
  }
})

fs.readFile(path.resolve(__dirname, '../../dist/assets.json'), 'utf8', (err, data) => {
  if (err) throw err
  assets = JSON.parse(data)
  app.listen(port, () => {
    console.log('ssr server listening on http://localhost:' + port)
  })
})
