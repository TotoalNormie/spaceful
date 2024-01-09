import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import './style/main.css';
import Test from "./components/Test"
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route exact path='/test' element={<Test/>} />
      <Route exact path='/login' element={<Login/>} />
      <Route exact path='/register' element={<Register/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
