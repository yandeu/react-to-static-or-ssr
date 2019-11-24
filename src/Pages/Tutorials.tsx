import React, { useEffect } from 'react'
import { clientStore, serverStore } from '../store/store'
import { fetchPages } from '../store/actions'
import Hero from '../Components/Hero/Hero'
import { Link } from 'react-router-dom'

const Tutorials = () => {
  const store = clientStore()

  useEffect(() => {
    store.dispatch(fetchPages('tutorials'))
  }, [])

  return (
    <div>
      <Hero title="Tutorials" subtitle="Read some awesome tutorials" />
      <section>
        <div className="container">
          <ul>
            <li>
              <Link to="/tutorials/first-phaser-game">First Phaser Game</Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

Tutorials.prefetchData = () => {
  return serverStore.dispatch(fetchPages('tutorials'))
}

export default Tutorials
