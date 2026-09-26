import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import logo from '@/imports/image.png'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Contact Us', to: '/contact' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const location = useLocation()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      window.location.href = `/products?code=${encodeURIComponent(search.trim())}`
      setMenuOpen(false)
    }
  }

  return (
    <>
      {/* Top Utility Bar (Visible on Tablet & Desktop) */}
      <div className="bg-[#162d6e] text-white text-xs py-2 px-4 sm:px-6 hidden md:flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-4 lg:gap-6 text-blue-200 text-[11px] lg:text-xs">
          <a href="tel:+918800732441" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 text-[#F59E0B] shrink-0">
              <path d="M2 2.5A2.5 2.5 0 014.5 0h1.75c.276 0 .5.224.5.5V4c0 .552-.448 1-1 1H4.25C3.56 5 3 5.56 3 6.25v.5C3 8.664 5.336 11 7.25 11h.5C8.44 11 9 10.44 9 9.75V8.25c0-.552.448-1 1-1h3.5c.276 0 .5.224.5.5v1.75A2.5 2.5 0 0111.5 12H8.25C4.8 12 2 9.2 2 5.75V2.5z"/>
            </svg>
            <span className="truncate">+91-8800732441</span>
          </a>
          <a href="mailto:skindustrynoida@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors hidden sm:flex">
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 text-[#F59E0B] shrink-0">
              <path d="M0 4a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H2a2 2 0 01-2-2V4zm2-1a1 1 0 00-1 1v.217l7 4.2 7-4.2V4a1 1 0 00-1-1H2zm13 2.383l-4.758 2.855L15 11.114V5.383zm-.034 6.878L9.271 8.82 8 9.583l-1.271-.764-5.695 3.44A1 1 0 002 13h12a1 1 0 00.966-.739zM1 11.114l4.758-2.876L1 5.383v5.731z"/>
            </svg>
            <span className="truncate">skindustrynoida@gmail.com</span>
          </a>
          <span className="items-center gap-1.5 hidden xl:flex">
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 text-[#F59E0B] shrink-0">
              <path d="M8 16s6-5.686 6-10A6 6 0 002 6c0 4.314 6 10 6 10zm0-7a3 3 0 110-6 3 3 0 010 6z"/>
            </svg>
            Noida Works, Sector-80 — India
          </span>
        </div>
        <div className="flex items-center gap-3 lg:gap-4 text-[11px] lg:text-xs">
          <Link to="/contact?tab=tracker" className="text-blue-200 hover:text-[#F59E0B] transition-colors flex items-center gap-1 font-medium">
            <span>🔍</span> Track RFQ
          </Link>
          <Link to="/contact?tab=console" className="text-blue-200 hover:text-white transition-colors flex items-center gap-1">
            <span>⚙️</span> Factory Desk
          </Link>
          <a href="#" className="flex items-center gap-1.5 text-[#F59E0B] hover:text-amber-300 transition-colors font-medium">
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 shrink-0">
              <path d="M.5 9.9a.5.5 0 01.5.5V14H15v-3.6a.5.5 0 011 0V14a1 1 0 01-1 1H1a1 1 0 01-1-1V10.4a.5.5 0 01.5-.5zM8 1a.5.5 0 01.5.5v8.793l2.646-2.647a.5.5 0 01.708.708l-3.5 3.5a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L7.5 10.293V1.5A.5.5 0 018 1z"/>
            </svg>
            Catalog (PDF)
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white border-b border-[#E2E8F0] sticky top-0 z-50 shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-[72px]">
          {/* Brand Logo */}
          <Link to="/" className="shrink-0 flex items-center max-w-[170px] sm:max-w-none">
            <div className="h-11 sm:h-14 overflow-hidden flex items-end">
              <img
                src={logo}
                alt="SK Industry — Committed to Quality"
                style={{
                  height: '100px',
                  width: 'auto',
                  transform: 'translateY(0)',
                  objectFit: 'contain',
                  objectPosition: 'bottom',
                }}
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-slate-700">
            {NAV_LINKS.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`py-1 border-b-2 transition-colors hover:text-[#1E3A8A] hover:border-[#1E3A8A] ${
                  (l.to === '/' ? location.pathname === '/' : location.pathname.startsWith(l.to))
                    ? 'border-[#1E3A8A] text-[#1E3A8A]'
                    : 'border-transparent text-slate-600'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right Header CTAs & Search (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <form onSubmit={handleSearch} className="flex items-center border border-[#E2E8F0] rounded-lg overflow-hidden focus-within:border-[#1E3A8A] transition-colors">
              <input
                type="text"
                placeholder="Search code…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="text-xs px-3 py-2 w-32 xl:w-44 outline-none bg-[#F8FAFC] placeholder-slate-400 font-mono"
              />
              <button type="submit" aria-label="Search" className="px-2.5 py-2 bg-[#F8FAFC] border-l border-[#E2E8F0] text-slate-500 hover:text-[#1E3A8A] transition-colors">
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.099zm-5.242 1.156a5.5 5.5 0 110-11 5.5 5.5 0 010 11z"/>
                </svg>
              </button>
            </form>
            <Link to="/contact" className="bg-[#1E3A8A] text-white font-bold px-4 xl:px-5 py-2.5 rounded-full text-xs hover:bg-[#162d6e] transition-colors shadow-sm whitespace-nowrap">
              Request a Quote →
            </Link>
          </div>

          {/* Mobile Right Controls: Quick Quote & Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/contact"
              className="bg-[#1E3A8A] text-white font-bold px-3 py-1.5 rounded-full text-xs shadow-sm hover:bg-[#152960]"
            >
              Quote
            </Link>
            <button
              className="p-2 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle navigation menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
                {menuOpen ? <path d="M6 18L18 6M6 6l12 12"/> : <><path d="M4 6h16M4 12h16M4 18h16"/></>}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu with Full Features */}
        {menuOpen && (
          <div className="lg:hidden border-t border-[#E2E8F0] bg-white px-4 py-5 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top duration-200">
            {/* Mobile Product Search */}
            <form onSubmit={handleSearch} className="flex items-center border border-[#E2E8F0] rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search code (e.g. TM-08, PU06)…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="text-xs px-3.5 py-2.5 flex-1 outline-none bg-slate-50 placeholder-slate-400 font-mono"
              />
              <button type="submit" className="px-3.5 py-2.5 bg-slate-100 border-l border-[#E2E8F0] text-slate-600 font-bold text-xs">
                Search
              </button>
            </form>

            {/* Navigation Links */}
            <div className="flex flex-col divide-y divide-slate-100">
              {NAV_LINKS.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm font-bold py-3 flex items-center justify-between transition-colors ${
                    (l.to === '/' ? location.pathname === '/' : location.pathname.startsWith(l.to))
                      ? 'text-[#1E3A8A]'
                      : 'text-slate-700 hover:text-[#1E3A8A]'
                  }`}
                >
                  <span>{l.label}</span>
                  <span className="text-slate-400 text-xs">→</span>
                </Link>
              ))}
            </div>

            {/* Mobile Utility Actions */}
            <div className="pt-2 grid grid-cols-2 gap-2 text-center text-xs">
              <Link
                to="/contact?tab=tracker"
                onClick={() => setMenuOpen(false)}
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold flex items-center justify-center gap-1.5"
              >
                <span>🔍</span> Track RFQ
              </Link>
              <Link
                to="/contact?tab=console"
                onClick={() => setMenuOpen(false)}
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold flex items-center justify-center gap-1.5"
              >
                <span>⚙️</span> Factory Desk
              </Link>
            </div>

            <a
              href="tel:+918800732441"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-center font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>📞</span> Call Factory Works (+91-8800732441)
            </a>
          </div>
        )}
      </nav>
    </>
  )
}
