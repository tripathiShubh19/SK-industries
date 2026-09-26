import { Outlet, useLocation } from 'react-router'
import { useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function Root() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden w-full relative">
      <ScrollToTop />
      <Nav />
      <main className="flex-1 w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
