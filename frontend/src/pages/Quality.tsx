import { Link } from 'react-router'

const CERTS = [
  {
    code: 'IS 447',
    title: 'Thermoplastic Welding Hoses',
    cml: 'BIS CML No. 8700036611',
    scope: 'Thermoplastic hoses for oxygen and acetylene gas in oxy-fuel welding, cutting, and heating applications.',
    body: 'Bureau of Indian Standards (BIS)',
    color: '#1E3A8A',
    badge: 'IS:447',
    requirements: [
      'WP: 20 Bar (290 PSI) minimum', 'Burst pressure: 3× WP minimum', 'Flame-retardant outer compound',
      'Colour-coded: Blue (O₂), Red (C₂H₂)', 'Anti-static inner lining', 'BIS factory licence mandatory',
    ],
  },
  {
    code: 'IS 12585:1988',
    title: 'Fire Hose Reel Hoses',
    cml: 'IS 12585 Certified',
    scope: 'Thermoplastic hoses for fire fighting hose reel systems installed in buildings, factories, and public infrastructure.',
    body: 'Bureau of Indian Standards (BIS)',
    color: '#B91C1C',
    badge: 'IS:12585',
    requirements: [
      'Type 1: DN 19mm bore', 'Type 2: DN 25mm bore', 'WP: 12 Bar minimum',
      'BP: 48 Bar minimum (4× WP)', 'Flame-retardant outer jacket — mandatory', 'Approved for government/public contracts',
    ],
  },
]

const TESTS = [
  { name: 'Burst Pressure Test', std: 'IS:3400 Method', desc: 'Hydrostatic burst test at minimum 4× working pressure. Every batch. Zero exceptions.' },
  { name: 'Adhesion Strength', std: 'ISO 8033 / IS:3400', desc: 'Lining-to-cover and cover-to-braid adhesion tested. Minimum ≥ 2.5 kN/m required for release.' },
  { name: 'Kink Resistance', std: 'Internal SOP', desc: 'Bend and kink test at rated minimum bend radius under working pressure — zero flow restriction permitted.' },
  { name: 'Flame Retardancy', std: 'IS 12585 Clause 7', desc: 'Outer jacket self-extinguishing test. Burn stops within 30 seconds after flame removal.' },
  { name: 'Tensile & Elongation', std: 'ISO 37 / IS:3400', desc: 'Lining tensile ≥ 10 N/mm² @ 220% elongation. Cover ≥ 14 N/mm² @ 300% elongation.' },
  { name: 'Dimensional Check', std: 'IS 447 / IS 12585', desc: 'OD, ID, wall thickness, and ovality verified against IS tolerance specifications using calibrated gauges.' },
  { name: 'Temperature Cycling', std: 'Internal SOP', desc: 'Thermal endurance from -20°C to +80°C — no delamination, softening, or flow restriction permitted.' },
  { name: 'Colour Coding Verification', std: 'IS 447 Cl. 4', desc: 'Oxygen (blue) and Acetylene (red) hose colour verified against IS 447 specification before dispatch.' },
]

export default function Quality() {
  return (
    <>
      <section className="bg-[#1E3A8A] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F59E0B] mb-3">Quality & Standards</div>
          <h1 className="text-3xl lg:text-5xl font-extrabold mb-4 leading-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            Certified. In-House Tested. Zero Defect.
          </h1>
          <p className="text-slate-300 max-w-2xl text-lg">
            SK Industry operates under BIS licensing with a Total Quality Management system. Every product batch is tested in our in-house laboratory before dispatch.
          </p>
        </div>
      </section>

      {/* Cert badges strip */}
      <section className="bg-[#F8FAFC] py-10 px-6 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4">
          {['BIS / ISI Certified', 'CML No. 8700036611', 'IS 447 Approved', 'IS 12585:1988 Stamped', 'ISO 8033 Adhesion Tested', 'In-House Quality Testing Lab'].map(b => (
            <div key={b} className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-full px-4 py-2.5 text-sm font-semibold text-[#1E3A8A] shadow-sm">
              <span className="text-[#F59E0B] font-bold">✓</span>{b}
            </div>
          ))}
        </div>
      </section>

      {/* Certification Details */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F59E0B] mb-3">BIS / ISI Certifications</div>
          <h2 className="text-3xl font-extrabold text-[#1E3A8A] mb-10" style={{ fontFamily: 'Plus Jakarta Sans' }}>Indian Standard Compliance</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {CERTS.map(c => (
              <div key={c.code} className="rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm">
                <div className="px-8 py-6 flex items-center gap-5" style={{ background: c.color }}>
                  <div className="w-20 h-20 rounded-xl bg-white/10 border border-white/25 flex flex-col items-center justify-center shrink-0">
                    <div className="text-white text-[10px] font-bold text-center leading-tight" style={{ fontFamily: 'JetBrains Mono' }}>{c.badge}</div>
                    <div className="text-white/60 text-[8px] mt-1">BIS APPROVED</div>
                  </div>
                  <div>
                    <div className="text-white font-extrabold text-xl" style={{ fontFamily: 'Plus Jakarta Sans' }}>{c.code}</div>
                    <div className="text-white/80 font-medium">{c.title}</div>
                    <div className="text-white/60 text-xs mt-1">{c.cml}</div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Certification Body</div>
                  <div className="font-semibold text-[#1E3A8A] mb-4">{c.body}</div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5">{c.scope}</p>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Standard Requirements</div>
                  <ul className="space-y-2">
                    {c.requirements.map(r => (
                      <li key={r} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <span className="text-[#F59E0B] font-bold shrink-0">✓</span>{r}
                      </li>
                    ))}
                  </ul>
                  <Link to="/products" className="mt-6 inline-block text-sm font-semibold text-[#F59E0B] hover:underline">
                    View certified products →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tests grid */}
      <section className="py-16 px-6 bg-[#F8FAFC] border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F59E0B] mb-3">In-House Quality Laboratory</div>
            <h2 className="text-3xl font-extrabold text-[#1E3A8A]" style={{ fontFamily: 'Plus Jakarta Sans' }}>Every Batch. Every Test. No Exceptions.</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm">
              SK Industry's factory laboratory conducts mandatory batch-level testing before any product leaves the facility. Full test reports available on request.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TESTS.map(t => (
              <div key={t.name} className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider mb-1">{t.std}</div>
                <h3 className="font-bold text-[#1E3A8A] mb-2 text-sm" style={{ fontFamily: 'Plus Jakarta Sans' }}>{t.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TDS Downloads */}
      <section className="py-16 px-6 bg-[#1E3A8A]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-3xl font-extrabold mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>Technical Documents Available</h2>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Full product TDS, BIS certificates, adhesion test reports, and the complete 16-page product catalogue available for download. OEM customers: PPAP documentation on request.
            </p>
            <Link to="/contact" className="bg-[#F59E0B] text-white font-bold px-6 py-3 rounded-md hover:bg-[#d97706] transition-colors text-sm inline-block">
              Request Test Certificates & TDS →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              'Full 16-Page Product Catalogue (PDF)',
              'BIS IS 447 Certificate Copy',
              'IS 12585:1988 Compliance',
              'Adhesion Test Report (ISO 8033)',
              'Material Safety Data Sheets',
              'OEM PPAP Package (on request)',
            ].map(d => (
              <a key={d} href="#" className="flex items-start gap-3 bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-colors group">
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5">
                  <path d="M.5 9.9a.5.5 0 01.5.5V14H15v-3.6a.5.5 0 011 0V14a1 1 0 01-1 1H1a1 1 0 01-1-1V10.4a.5.5 0 01.5-.5zM8 1a.5.5 0 01.5.5v8.793l2.646-2.647a.5.5 0 01.708.708l-3.5 3.5a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L7.5 10.293V1.5A.5.5 0 018 1z"/>
                </svg>
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors leading-snug">{d}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
