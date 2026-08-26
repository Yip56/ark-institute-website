import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ContemporaryMusic from './pages/ContemporaryMusic'
import ClassicalMusic from './pages/ClassicalMusic'
import About from './pages/About'
import Pricing from './pages/Pricing'
import FreeTrial from './pages/FreeTrial'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contemporary-music" element={<ContemporaryMusic />} />
          <Route path="classical-music" element={<ClassicalMusic />} />
          <Route path="about" element={<About />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="free-trial" element={<FreeTrial />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
