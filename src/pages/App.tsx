import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import ErrorModal from '../components/ErrorModal'
import PopupModal from '../components/PopupModal'
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
        <PopupModal/>
        <div className='page-container'>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminPage maxData={1}/>} />
            <Route path="/singer" element={<SingerPage maxData={8} />} />"
          </Routes>
        </div>
      </ModalContextProvider>
    </UserContextProvider>
  )
}

export default App
