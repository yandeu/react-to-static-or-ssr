import React from 'react'
import { renderRoutes } from 'react-router-config'
import './App.css'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'

const App = props => {
  const { route } = props
  return (
    <div id="app">
      <Header />
      {renderRoutes(route.routes)}
      <Footer />
    </div>
  )
}
export default App
