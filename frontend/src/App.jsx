import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
// import Test from "./components/Test"
import Login from "./components/Login"
import Register from "./components/Register"
import Logout from "./components/Logout"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' />
      <Route exact path='/login' element={<Login/>} />
      <Route exact path='/register' element={<Register/>} />
      <Route exact path='/logout' element={<Logout/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
