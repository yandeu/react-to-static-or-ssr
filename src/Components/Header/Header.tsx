import React, { useState } from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'

const Header = () => {
  const [open, setOpen] = useState(false)

  const toggleNav = () => {
    setOpen(!open)
  }

  const navBar = () => {
    let classes = [styles.navbar]
    if (!open) classes.push('is-hidden-mobile')

    return (
      <div className={classes.join(' ')}>
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/tutorials">
            <li>Tutorials</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/name">
            <li>Name</li>
          </Link>
          <Link to="/simple">
            <li>Simple</li>
          </Link>
        </ul>
      </div>
    )
  }

  return (
    <header className={styles.root}>
      <div className="container">
        <div className={styles.logo}>
          <Link to="/">LOGO</Link>
        </div>
        <nav onClick={toggleNav} className={styles.nav}>
          <span className={styles.burger}>navbar</span>
          {navBar()}
        </nav>
      </div>
    </header>
  )
}

export default Header
