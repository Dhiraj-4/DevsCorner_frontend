import './App.css'
import { Route, Routes } from 'react-router-dom'
import { SignupPage } from './pages/signupPage.jsx'
import { LoginPage } from './pages/loginPage.jsx'
import { ForgotPasswordPage } from './pages/forgotPasswordPage.jsx'

function App() {

  return (
   <Routes>
    <Route path='/' element={<div className=" bg-black h-[100vh] text-white">Home page</div>} />
    <Route path='/signup' element={<SignupPage/>} />
    <Route path='/login' element={<LoginPage/>} />
    <Route path='/forgot-password' element={<ForgotPasswordPage/>} />
   </Routes>
  )
}

export default App
