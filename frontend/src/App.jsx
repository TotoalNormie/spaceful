import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Test from "./components/Test"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' />
      <Route exact path='/test' element={<Test/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
