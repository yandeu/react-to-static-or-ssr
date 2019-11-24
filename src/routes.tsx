import { RouteConfig } from 'react-router-config'

import App from './App'
import Home from './Pages/Home'
import About from './Pages/About'
import SomePage from './Pages/SomePage'
import DisplayName from './Pages/DisplayName'
import NotFoundPage from './Pages/404'
import Tutorial from './Pages/Tutorial'
import Tutorials from './Pages/Tutorials'

const routes: RouteConfig[] = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/about',
        exact: true,
        component: About
      },
      {
        path: '/name',
        exact: true,
        component: DisplayName
      },
      {
        path: '/simple',
        exact: true,
        component: SomePage
      },
      {
        path: '/tutorials',
        exact: true,
        component: Tutorials
      },
      {
        path: '/tutorials/:id',
        exact: true,
        component: Tutorial
      },
      {
        path: '*',
        component: NotFoundPage
      }
    ]
  }
]

export default routes
