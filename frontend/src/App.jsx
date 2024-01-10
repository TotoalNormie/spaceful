import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './style/main.css';
<<<<<<< HEAD
import Test from './components/Test';
import Home from './components/Home';
import Header from './components/Header';
import Jabis from './components/Jabis';

function App() {
	return (
		<BrowserRouter>
			<Header />
			<main>
				<Routes>
          
					<Route exact path='/' element={<Home />} />
					<Route exact path='/test' element={<Test />} />
					<Route exact path='/resns' element={<Jabis />} />
				</Routes>
			</main>
		</BrowserRouter>
	);
=======
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
>>>>>>> b73da54d555fa0508aa285cc6ae99bedbadab02a
}

export default App;
