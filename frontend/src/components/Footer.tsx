import { Link } from 'react-router'
import logo from '@/imports/image.png'

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white pt-12 sm:pt-16 pb-8 px-4 sm:px-6 border-t border-slate-800 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-12">
          {/* Col 1 */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <div className="h-12 overflow-hidden bg-white rounded-lg px-2 flex items-end">
                <img
                  src={logo}
                  alt="SK Industry — Industry Committed to Quality"
                  style={{ height: '96px', width: 'auto', objectFit: 'contain', objectPosition: 'bottom' }}
                />
              </div>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Precision-engineered thermoplastic hose manufacturer supplying OEM, trade, and government clients across India. Factory-direct. BIS certified.
            </p>
            <div className="text-xs text-slate-500 font-mono">
              BIS CML License: 8700036611
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-xs tracking-wider uppercase">Core Hose Lines</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {[
                { label: 'Thermoplastic Multipurpose Hoses', hash: 'thermoplastic' },
                { label: 'Air / Water Hoses', hash: 'airwater' },
                { label: 'PVC Braided Hoses', hash: 'pvc' },
                { label: 'PU Tubing & Recoil Hoses', hash: 'pu' },
                { label: 'Thermoplastic Welding Hoses (IS 447)', hash: 'welding' },
                { label: 'Fire Hose Reel Hoses (IS 12585)', hash: 'fire' },
              ].map(l => (
                <li key={l.label}>
                  <Link to={`/products#${l.hash}`} className="hover:text-[#F59E0B] transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-xs tracking-wider uppercase">Quick Links & Standards</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/products#quality" className="hover:text-[#F59E0B] transition-colors flex items-center gap-1.5">
                  <span className="text-[#F59E0B]">✓</span> IS 447 & IS 12585 Standards
                </Link>
              </li>
              <li>
                <Link to="/products#quality" className="hover:text-[#F59E0B] transition-colors flex items-center gap-1.5">
                  <span className="text-[#F59E0B]">✓</span> 8 In-House Laboratory Tests
                </Link>
              </li>
              <li>
                <Link to="/products#applications" className="hover:text-[#F59E0B] transition-colors flex items-center gap-1.5">
                  <span className="text-[#F59E0B]">✓</span> 8 Industrial Application Sectors
                </Link>
              </li>
              <li>
                <Link to="/contact?tab=tracker" className="hover:text-[#F59E0B] transition-colors flex items-center gap-1.5">
                  <span className="text-[#F59E0B]">✓</span> Live Quotation Tracker
                </Link>
              </li>
              <li>
                <Link to="/contact?tab=console" className="hover:text-[#F59E0B] transition-colors flex items-center gap-1.5">
                  <span className="text-[#F59E0B]">✓</span> Factory Management Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-xs tracking-wider uppercase">Direct Factory Works</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <span className="text-[#F59E0B]">📍</span>
                <span>A-109 W, Sector-80, Noida-201305, Uttar Pradesh, India</span>
              </div>
              <a href="tel:+918800732441" className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="text-[#F59E0B]">📞</span>
                +91-8800732441
              </a>
              <a href="mailto:skindustrynoida@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="text-[#F59E0B]">✉️</span>
                skindustrynoida@gmail.com
              </a>
              <div className="flex items-center gap-2 text-slate-500">
                <span className="text-[#F59E0B]">⏰</span>
                <span>Mon–Sat: 09:30 AM – 06:30 PM IST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} SK Polychem Industries. All rights reserved. Factory-direct industrial hoses.
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
            <Link to="/" className="hover:text-slate-400 transition-colors">Home</Link>
            <Link to="/products" className="hover:text-slate-400 transition-colors">Products</Link>
            <Link to="/contact" className="hover:text-slate-400 transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
