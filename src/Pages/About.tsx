import React, { useEffect } from 'react'
import Hero from '../Components/Hero/Hero'

import { clientStore, serverStore } from '../store/store'
import { fetchUserNameAndId } from '../store/actions'
// @ts-ignore
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  section: {
    background: 'yellow',
    transition: 'background 0.4s ease',
    '& h2': { color: 'red' },
    '&:hover': {
      background: '#ffd02b'
    }
  }
})

const About = () => {
  const classes = useStyles()
  const store = clientStore()

  useEffect(() => {
    store.dispatch(fetchUserNameAndId())
  }, [])

  return (
    <div>
      <Hero title="About Page" subtitle="about me" />
      <section className={classes.section}>
        <div className="container">
          <h2>Who am I?</h2>
          <p>Bli bla blu.</p>
          <br />
          <ul>
            {store.state.userData ? (
              store.state.userData?.map(({ id, name }, i) => (
                <li key={i}>
                  <b>{id}</b>: {name}
                </li>
              ))
            ) : (
              <div>...loading</div>
            )}
          </ul>
        </div>
      </section>
    </div>
  )
}

About.prefetchData = () => {
  return serverStore.dispatch(fetchUserNameAndId())
}

export default About
