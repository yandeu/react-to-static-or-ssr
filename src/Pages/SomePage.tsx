import React from 'react'
import Hero from '../Components/Hero/Hero'

const SomePage = () => {
  return (
    <div>
      <Hero title="A very simple page" subtitle="without data fetching" />
      <section className="section">
        <div className="container">
          <h2>Without a Header</h2>
          <p>without text...</p>
        </div>
      </section>
    </div>
  )
}

export default SomePage
