import React, { Component } from 'react'
import Loadable from 'react-loadable'

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
      loader: () => import(`${path}`),
      loading: Loading,
      render(loaded, props) {
        return <loaded.default.component {...props} />
      }
    }),
    prefetchData: args => import(`${path}`).then(loaded => loaded.default.prefetchData(args))
  }
}

export default CustomLoadable
