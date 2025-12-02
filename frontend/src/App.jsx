import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import KYCForm from './pages/KYCForm'
import Result from './pages/Result'
import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing'

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
