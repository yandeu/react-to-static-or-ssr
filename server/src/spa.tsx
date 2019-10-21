const express = require('express')
const compression = require('compression')
const path = require('path')

const port = process.env.PORT || 3050
const app = express()

app.use(compression())

app.use('/', express.static(path.resolve(__dirname, '../../dist')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'))
})

app.listen(port, () => {
  console.log('dev server listening on http://localhost:' + port)
})
