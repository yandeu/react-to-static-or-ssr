import React, { FunctionComponent } from 'react'
import styles from './Hero.module.css'

interface Props {
  title: string
  subtitle?: string
}

const Hero: FunctionComponent<Props> = ({ title, subtitle }) => {
  return (
    <section className={styles.root}>
      <div className="container">
        <h1 className={styles.title}>{title}</h1>
        {subtitle ? <span className={styles.subtitle}>{subtitle}</span> : null}
      </div>
    </section>
  )
}

export default Hero
