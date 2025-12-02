import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Home from './pages/Home'
import KYCForm from './pages/KYCForm'
import Result from './pages/Result'
import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing'

// Set axios base URL for production
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/verify" element={<Home />} />
        <Route path="/kyc" element={<KYCForm />} />
        <Route path="/result" element={<Result />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
