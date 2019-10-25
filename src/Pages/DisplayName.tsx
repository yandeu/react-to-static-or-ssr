import React, { useEffect } from 'react'

import { clientStore, serverStore, withStore } from '../store/store'
import { fetchName } from '../store/actions'

const loadData = () => {
  return serverStore.dispatch(fetchName())
}

const DisplayName = () => {
  const store = clientStore()

  useEffect(() => {
    store.dispatch(fetchName())
  }, [])

  return (
    <div>
      <section className="section">
        <div className="container">
          <h1>Prefetch Name</h1>
          <p>
            The prefetched name: <b>{store.state.name}</b>
          </p>
        </div>
      </section>
    </div>
  )
}

export default withStore(DisplayName, { loadData })
