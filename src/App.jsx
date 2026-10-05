import React from 'react'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import Detail from './components/Detail'
import Login from './components/Login'
import Destinazione from './components/Destinazione'
import Volo from './components/Volo'
import Alloggio from './components/Alloggio'
import Disneyland from './components/Disneyland'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/destinazione" element={<Destinazione />} />
          <Route path="/volo" element={<Volo />} />
          <Route path="/alloggio" element={<Alloggio />} />
          <Route path="/disneyland" element={<Disneyland />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
