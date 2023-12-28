import React from 'react'
import Products from './components/Products'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Cart from './components/Cart'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  )
}

export default App