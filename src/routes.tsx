import { RouteConfig } from 'react-router-config'
import { routeStore } from './store/store'

import App from './App'
import Home from './Pages/Home'
import About from './Pages/About'
import SimplePage from './Pages/SomePage'

const routes: RouteConfig[] = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        ...routeStore(Home)
      },
      {
        path: '/about',
        exact: true,
        ...routeStore(About)
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
