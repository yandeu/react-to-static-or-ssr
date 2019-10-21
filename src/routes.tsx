import App from './App'
import Home from './Pages/Home'

import { RouteConfig } from 'react-router-config'
import About from './Pages/About'
import SimplePage from './Pages/SomePage'

const routes: RouteConfig[] = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        ...Home
      },
      {
        path: '/about',
        exact: true,
        ...About
      },
      {
        path: '/simple',
        exact: true,
        component: SimplePage
      }
    ]
  }
]

export default routes
