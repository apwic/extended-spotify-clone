import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import ErrorModal from '../components/ErrorModal'
import { ModalContextProvider } from '../context/ModalContext'
import { UserContextProvider } from '../context/UserContext'
import '../styles/App.css'
import AdminPage from './AdminPage'
import Login from './Login'
import Register from './Register'
import SingerPage from './SingerPage'

const App = () => {
  

  return (
    <UserContextProvider>
      <ModalContextProvider>
        <ErrorModal/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminPage maxData={1}/>} />
          <Route path="/singer" element={<SingerPage maxData={3} />} />"
        </Routes>
      </ModalContextProvider>
    </UserContextProvider>
  )
}

export default App
