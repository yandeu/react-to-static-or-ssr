import React, { Component } from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'

class Header extends Component {
  state = {
    open: false
  }

  toggleNav = () => {
    this.setState({ open: !this.state.open })
  }

  navBar = () => {
    let classes = [styles.navbar]
    if (!this.state.open) classes.push('is-hidden-mobile')

    return (
      <div className={classes.join(' ')}>
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/simple">
            <li>Simple</li>
          </Link>
        </ul>
      </div>
    )
  }

  render() {
    return (
      <header className={styles.root}>
        <div className="container">
          <div className={styles.logo}>LOGO</div>
          <nav onClick={this.toggleNav} className={styles.nav}>
            <span className={styles.burger}>navbar</span>
            {this.navBar()}
          </nav>
        </div>
      </header>
    )
  }
}

export default Header
