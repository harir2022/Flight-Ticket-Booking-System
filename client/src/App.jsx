import { useState } from 'react'
import './App.css'

import NavBar from './Components/Navbar'
import {Container }from 'react-bootstrap'

import {BrowserRouter as Router , Route } from 'react-router-dom'
import Home from './Components/Home'

function App() {  

  return (
    <Router>
        <NavBar/>        
      
        <Route path='/' component={Home}/>
        
        

      
    </Router>
  )
}

export default App
