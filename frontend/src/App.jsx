import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
// import Test from "./components/Test"
import Login from "./components/Login"
import Register from "./components/Register"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' />
      <Route exact path='/login' element={<Login/>} />
      <Route exact path='/register' element={<Register/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
