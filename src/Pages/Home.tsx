import React, { useEffect } from 'react'
import Hero from '../Components/Hero/Hero'

import { clientStore, serverStore, withStore } from '../store/store'
import { fetchName, fetchEmailAddresses } from '../store/actions'
import { Link } from 'react-router-dom'

const loadData = () => {
  // if you fetch only one resource you can simply use ↵
  // return serverStore.dispatch(fetchName())
  // but if you fetch multiple resources use an array ↵
  return [serverStore.dispatch(fetchName()), serverStore.dispatch(fetchEmailAddresses())]
}

const Home = () => {
  const store = clientStore()

  useEffect(() => {
    store.dispatch(fetchName())
    store.dispatch(fetchEmailAddresses())
  }, [])

  return (
    <div>
      <Hero title={store.state.name} subtitle="page subtitle" />
      <section className="section">
        <div className="container">
          <h2>Address: {store.state.address}</h2>
          <div>
            <img style={{ maxWidth: 200 }} src="/img/react-logo.svg" />
          </div>

          <Link to="/tutorials">Go to the tutorials</Link>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book...
          </p>
          <br />
          <ul>
            {store.state?.emails ? (
              store.state?.emails?.map((email, i) => <li key={i}>{email}</li>)
            ) : (
              <div>...loading</div>
            )}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default withStore(Home, { loadData })
