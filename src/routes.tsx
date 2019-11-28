import { RouteConfig } from 'react-router-config'

import React from 'react'
import Loadable from 'react-loadable'

import App from './App'
import Home from './Pages/Home'
// import About from './Pages/About'
import SomePage from './Pages/SomePage'
import DisplayName from './Pages/DisplayName'
import NotFoundPage from './Pages/404'
import Tutorial from './Pages/Tutorial'
import Tutorials from './Pages/Tutorials'

const Loading = props => {
  if (props.error) {
    return (
      <div>
        Error! <button onClick={props.retry}>Retry</button>
      </div>
    )
  } else if (props.pastDelay) {
    return <div>Loading...</div>
  } else {
    return null
  }
}

const CustomLoadable = (path: string) => {
  return {
    component: Loadable({
      loader: () => import('@pages/About'),
      loading: Loading,
      render(loaded, props) {
        return <loaded.default.component {...props} />
      }
    }),
    prefetchData: args => import('@pages/About').then(loaded => loaded.default.prefetchData(args))
  }
}
const About = CustomLoadable('@pages/About')

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
        ...About
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
