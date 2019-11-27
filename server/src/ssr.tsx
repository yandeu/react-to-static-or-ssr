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

app.get('*', async (req, res, next) => {
  // pass to express.static route if a file is requested
  if (/^\/.*\..+/gm.test(req.url)) return next()

  const context: { url?: string; status?: number } = {}
  const sheets = new SheetsRegistry()
  const origin = `${req.protocol}://${req.get('host')}`

  // load async data
  let promises: any[] = []
  matchRoutes(routes, req.url).forEach(({ route }) => {
    // @ts-ignore
    if (route.component?.prefetchData) promises.push(route.component.prefetchData({ url: req.url, origin }))
  })

  // flatten array of promises
  promises = promises.reduce((acc, val) => acc.concat(val), [])

  // wait for all promises to load
  // and get all states from the async fetch requests
  let initialState = {}
  await Promise.all(promises)
    .then(results => {
      results.forEach(state => {
        initialState = { ...initialState, ...state }
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

  if (context.status) res.status(context.status)

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

app.use('/', express.static(path.resolve(__dirname, '../../dist')))

fs.readFile(path.resolve(__dirname, '../../dist/assets.json'), 'utf8', (err, data) => {
  if (err) throw err
  assets = JSON.parse(data)
  app.listen(port, () => {
    console.log('ssr server listening on http://localhost:' + port)
  })
})
