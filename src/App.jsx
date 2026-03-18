import { Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Home from './pages/Home'
import PublicationDetail from './pages/PublicationDetail'

export default function App() {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/publication/:slug" element={<PublicationDetail />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </HelmetProvider>
  )
}
