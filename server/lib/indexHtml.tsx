// @ts-ignore
import serialize from 'serialize-javascript'

const indexHtml = (
  html: string,
  assets: Object,
  sheets: any,
  helmet: any,
  initialState: any,
  minify: boolean = false
) => {
  const str = `
<!DOCTYPE html>
<html ${helmet.htmlAttributes.toString() || `lang="en"`}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="icon" href="/static/favicon.ico" type="image/gif" sizes="16x16">
    ${Object.keys(assets)
      .filter(key => key.match('main.css'))
      .map(key => `<link rel="stylesheet" href="/${assets[key]}">`)
      .join('')}
    <style type="text/css" id="server-side-styles">
      ${sheets.toString()}
    </style>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
  </head>
  <body ${helmet.bodyAttributes.toString()}>
    ${helmet.script.toString()}
    ${helmet.noscript.toString()}
    <div id="root">${html}</div>
    <script>window.INITIAL_STATE = ${serialize(initialState)};</script>
    ${Object.keys(assets)
      .filter(key => key.match(/\.js$/g))
      .map(key => `<script src="/${assets[key]}"></script>`)}
  </body>
</html>
`
  const newLineReg = /(\r\n|\n|\r)/gm
  const emptySpaceReg = /\s{2,}/gm
  return minify ? str.replace(newLineReg, '').replace(emptySpaceReg, '') : str
}
export default indexHtml
