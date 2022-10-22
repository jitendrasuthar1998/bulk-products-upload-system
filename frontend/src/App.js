import React from 'react'
import FileUploadPage from './screens/FileUploadPage'
import ProductsScreen from './screens/ProductsScreen'
import { Route, Routes, Link } from 'react-router-dom'


import "./App.css"

export default function App() {

  return (
    <div>
      <nav className='navbar'>
        <span className='heading'>Bulk Products Upload System</span>
        <ul className='navbar-buttons'>
          <li><Link to="/">Upload Products</Link></li>
          <li><Link to="/products">View Products</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<FileUploadPage />} />
        <Route path='/products' element={<ProductsScreen />} />
      </Routes>
    </div>
  )
}
