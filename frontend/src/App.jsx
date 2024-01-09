import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import './style/main.css';
import Test from "./components/Test"
import Home from "./components/Home"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route exact path='/test' element={<Test/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
