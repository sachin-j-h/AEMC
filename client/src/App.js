import React, { createContext, useReducer } from 'react'
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Courses from './components/Courses'
import Register from './components/Register'
import Login from './components/Login'
import Logout from './components/Logout'
import Error from './components/Error'

import { initialValue, reducer } from "../src/reducer/UseReducer"

export const UserContext = createContext()

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialValue)
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/*' element={<Error />} />
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App