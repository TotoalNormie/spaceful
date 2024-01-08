import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
// import Test from "./components/Test"
import Test from "./components/Login"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' />
      <Route exact path='/login' element={<Test/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
