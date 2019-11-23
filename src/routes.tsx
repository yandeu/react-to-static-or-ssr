import { RouteConfig } from 'react-router-config'
import { routeStore } from './store/store'

import App from './App'
import Home from './Pages/Home'
import About from './Pages/About'
import SomePage from './Pages/SomePage'
import DisplayName from './Pages/DisplayName'
import NotFoundPage from './Pages/404'

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
        path: '/name',
        exact: true,
        ...routeStore(DisplayName)
      },
      {
        path: '/simple',
        exact: true,
        component: SomePage
      },
      {
        path: '*',
        component: NotFoundPage
      }
    ]
  }
]

export default routes
