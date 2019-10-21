<h1 align="center">
  <a href="https://github.com/yandeu/react-to-static-or-ssr#readme"><img src="./readme/header.png" alt="header" width="300" height="330"/></a>  
  <br />
  React to Static or SSR
</h1>

<h4 align="center">
A react starter template for creating single page applications, static html files or a server side rendered app.</h4>

<p align="center">
  <a href="https://david-dm.org/yandeu/react-to-static-or-ssr" title="dependencies status">
    <img src="https://david-dm.org/yandeu/react-to-static-or-ssr/status.svg?style=flat-square"/>
  </a>
  <a href="https://opensource.org/licenses/MIT" title="License: MIT" >
    <img src="https://img.shields.io/badge/License-MIT-greenbright.svg?style=flat-square">
  </a>
  <img src="https://img.shields.io/github/last-commit/yandeu/react-to-static-or-ssr.svg?style=flat-square" alt="GitHub last commit">
  <a href="https://github.com/prettier/prettier" alt="code style: prettier"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"></a>
</p>

## Key Features

- Very easy to read and use
- Only 10 dependencies
- Using TypeScript
- SEO features with react-helmet (incl. SSR)
- Async data fetching and rendering using only the react context api (no redux)
- css
  - Normal css (import ./some.css)
  - css modules (import styles from './some.module.css')
  - JSS (with SSR) _this is what I personally recommend, since it is directly rendered into the html file_

## Scripts

- `npm start` or `npm run dev` to run webpack-dev-server with normal react
- `npm spa:dev` to debug the spa server
- `npm ssr:dev` to develop the ssr react app
- `npm static:dev` to develop the static react app

## Ports

- Port 8080 (dev)
- Port 3050 (spa)
- Port 3060 (ssr)
- Port 3070 (static)

## License

The MIT License (MIT) 2019 - [Yannick Deubel](https://github.com/yandeu). Please have a look at the [LICENSE](LICENSE) for more details.
