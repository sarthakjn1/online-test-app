import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Quiz from './components/Quiz';
import Instructions from './components/Instructions';
import Categories from './components/Categories';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz/:categoryId" element={<Quiz />} />

        <Route path  = "/instructions" element={<Instructions />}/>
        <Route path = "/categories" element={<Categories />}/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
