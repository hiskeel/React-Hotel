import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './components/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Rooms from './components/Rooms'
// import Home from './components/Home'
// import ProductList from './components/ProductList'
// import NoPage from './components/NoPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>

          <Route path="rooms" element={<Rooms />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
