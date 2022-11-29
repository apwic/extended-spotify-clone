import { Route, Routes } from 'react-router-dom'
import '../styles/App.css'
import AdminPage from './AdminPage'
import Login from './Login'
import Register from './Register'
import SingerPage from './SingerPage'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/singer" element={<SingerPage maxData={2} />} />"
      </Routes>
    </div>
  )
}

export default App
