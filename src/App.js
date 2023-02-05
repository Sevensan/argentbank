import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import './style/css/main.css'
import HomePage from './pages/Homepage'
import Header from './components/Header'
import Login from './pages/Login'
import UserPage from './pages/UserPage'

function App() {


  return (
		<Router>
      <Header/>
			<Routes>
			  <Route path="/" element={<HomePage />}></Route>
			  <Route path="/login" element={<Login />}></Route>
			  <Route path="/user" element={<UserPage />}></Route>
			</Routes>
		</Router>
  )
}

export default App
