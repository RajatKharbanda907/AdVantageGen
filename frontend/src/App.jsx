import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import StudioPage from './pages/StudioPage'
import CampaignsPage from './pages/CampaignsPage'
import { ToastProvider } from './components/Toast'

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  )
}
