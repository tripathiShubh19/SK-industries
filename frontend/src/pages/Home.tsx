import { Link } from 'react-router'

const TRUST_BADGES = [
  { label: 'BIS / ISI Approved' },
  { label: 'In-House Testing Lab' },
  { label: 'ISO Compliant Quality' },
  { label: 'Flame & Rodent Proof' },
]

const VALUE_CARDS = [
  {
    stat: '1194+ PSI', sub: '84 Bar', title: 'High Pressure Tolerance',
    desc: 'Tested burst pressures engineered for extreme hydraulic and pneumatic demands.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <circle cx="20" cy="20" r="18" stroke="#F59E0B" strokeWidth="2"/>
        <path d="M20 8v12l7 7" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    stat: '-20°C → +80°C', sub: 'Continuous Operation', title: 'Temperature Resilience',
    desc: 'Maintains structural integrity across Arctic cold to industrial heat environments.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="17" y="4" width="6" height="22" rx="3" stroke="#F59E0B" strokeWidth="2"/>
        <circle cx="20" cy="30" r="6" stroke="#F59E0B" strokeWidth="2"/>
        <line x1="23" y1="10" x2="28" y2="10" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="23" y1="16" x2="26" y2="16" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    stat: 'IS 447 + IS 12585', sub: 'Dual Certification', title: 'Certified Standards',
    desc: 'Full BIS compliance for welding hoses and fire hose reel hoses.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <path d="M20 4l3.5 10.5H35L25.5 21l3.5 10.5L20 25l-9 6.5L14.5 21 5 14.5h11.5L20 4z" stroke="#F59E0B" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    stat: '4-Layer', sub: 'Sheathing Options', title: 'Specialized Sheathing',
    desc: 'Rodent-proof, UV-resistant, spark-resistant, and anti-static protective jackets.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <path d="M20 4C12 8 8 14 8 22c0 8 5.5 13 12 14 6.5-1 12-6 12-14 0-8-4-14-12-18z" stroke="#F59E0B" strokeWidth="2"/>
        <path d="M14 22l4 4 8-8" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

const PRODUCTS_PREVIEW = [
  { id: 'thermoplastic', code: 'TM', name: 'Thermoplastic Multipurpose & Air/Water Hoses', tags: ['Air', 'Water', 'Pneumatic'], spec: 'WP: 20 Bar | -10°C to +80°C' },
  { id: 'pvc', code: 'PVC', name: 'PVC Braided Hoses (Light & Heavy Duty)', tags: ['Light Duty PVC-L', 'Heavy Duty PVC-H'], spec: 'WP: 12–28 Bar | Non-toxic bore' },
  { id: 'pu', code: 'PU', name: 'Polyurethane (PU) Tubing & Recoil Hoses', tags: ['Shore 98A', 'Push Fittings', 'Zero Kink'], spec: 'Lengths: 3m–15m | Ether Grade' },
  { id: 'welding', code: 'WH', name: 'Thermoplastic Welding Hoses (IS 447)', tags: ['IS 447 BIS', 'O₂ + C₂H₂', 'Anti-Spark'], spec: 'IS 447 | WP: 20 Bar | Flame-retardant' },
  { id: 'fire', code: 'FH', name: 'Fire Hose Reel Hoses (IS 12585)', tags: ['IS 12585:1988', 'Type 1 & 2'], spec: 'WP: 12 Bar | BP: 48 Bar' },
]

// 8 Core Industrial Application Sectors with photography
const INDUSTRIES = [
  {
    title: 'Automobile & Automotive Equipments',
    img: 'https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=600&h=380&fit=crop&auto=format',
    desc: 'Air tools, pneumatic assembly robots, paint spray lines, coolant transfer, and brake air line systems across OEM and Tier-1 automotive plants.',
    products: ['TM Multipurpose Air Line', 'AW Heavy Duty Air/Water', 'PU Recoil for pneumatic tools'],
    icon: '🚗',
  },
  {
    title: 'Pneumatics & Automation Systems',
    img: 'https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?w=600&h=380&fit=crop&auto=format',
    desc: 'Recoil PU tubing and thermoplastic air lines for pneumatic valve manifolds, cylinder actuators, and process automation in manufacturing facilities.',
    products: ['PU Straight Tubes PU01–PU12', 'PU Recoil Coils 3m–15m', 'TM Multipurpose Compressed Air'],
    icon: '⚙️',
  },
  {
    title: 'Printing & Packaging Machines',
    img: 'https://images.unsplash.com/photo-1610891015188-5369212db097?w=600&h=380&fit=crop&auto=format',
    desc: 'PVC braided and PU tubing for ink and coolant transfer in offset, flexo, and digital printing; air actuation and vacuum lines in packaging machinery.',
    products: ['PVC-L Light Duty braided', 'PU Tubing for instrumentation', 'TM Air supply lines'],
    icon: '🖨️',
  },
  {
    title: 'Robotics & Industrial Machinery',
    img: 'https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?w=600&h=380&fit=crop&auto=format',
    desc: 'Kink-free PU tubing for robotic arm pneumatic circuits, CNC machine tool air supply, and pick-and-place system compressed air distribution.',
    products: ['PU Anti-spark sheath option', 'TM Push-to-connect lines', 'AW Heavy industrial air'],
    icon: '🤖',
  },
  {
    title: 'Steel Mills, Shipyards & Oil Refineries',
    img: 'https://images.unsplash.com/photo-1620203853151-496c7228306c?w=600&h=380&fit=crop&auto=format',
    desc: 'Heavy duty thermoplastic and welding hoses for oxygen-acetylene cutting in steel mills, hydraulic fluid transfer in shipyards, and instrument air lines in refineries.',
    products: ['WH Welding Hose IS 447', 'AW Heavy duty compressed air', 'TM Hydraulic fluid transfer'],
    icon: '🏭',
  },
  {
    title: 'Civil Construction & Underground Sites',
    img: 'https://images.unsplash.com/photo-1723532773642-2cd95209c3b3?w=600&h=380&fit=crop&auto=format',
    desc: 'Water discharge, concrete pumping air supply, pneumatic tool air lines, and welding hoses for civil construction, tunnelling, and underground infrastructure projects.',
    products: ['AW Air/Water 2" heavy duty', 'WH Welding Hose pairs', 'TM Multipurpose site hose'],
    icon: '🏗️',
  },
  {
    title: 'Food & Beverage Processing (Non-toxic)',
    img: 'https://images.unsplash.com/photo-1716972898936-dea6ba3162ab?w=600&h=380&fit=crop&auto=format',
    desc: 'Non-toxic food-grade PVC braided hoses for liquid transfer, compressed air for pneumatic filling lines, and clean water supply in food and beverage processing facilities.',
    products: ['PVC Food-grade non-toxic bore', 'PU Hygienic grade tubing', 'TM Silicon-free clean air'],
    icon: '🥤',
  },
  {
    title: 'Agriculture & Chemical Transfer Lines',
    img: 'https://images.unsplash.com/photo-1598023707207-276835c2b5fe?w=600&h=380&fit=crop&auto=format',
    desc: 'Chemically resistant PVC and multipurpose thermoplastic hoses for pesticide sprayers, drip irrigation headers, water tanker discharge, and mild chemical transfer.',
    products: ['PVC-L Braided suction hose', 'AW Water discharge hose', 'TM General fluid transfer'],
    icon: '🌾',
  },
]

const TIMELINE = [
  { year: '2005', event: 'SK Industry incorporated in Navi Mumbai. Manufacturing commenced with thermoplastic multipurpose hoses.' },
  { year: '2008', event: 'First BIS certification: IS 447 welding hoses. Factory licensed by Bureau of Indian Standards. CML No. 8700036611 issued.' },
  { year: '2011', event: 'IS 12585:1988 certification for fire hose reel products. Expanded facility to A-109 W, Sector-80, Noida-201305.' },
  { year: '2015', event: 'In-house quality testing laboratory commissioned. Full batch testing capability — burst pressure, adhesion, tensile, flame retardancy.' },
  { year: '2018', event: 'PU tubing and recoil coil product line launched. Anti-spark sheath and food-grade variants introduced.' },
  { year: '2022', event: 'Heavy duty PVC braided line expanded. Government procurement approvals across UP, Delhi NCR, and Maharashtra.' },
  { year: '2026', event: 'Pan-India supply network. Trusted by automotive OEMs, steel mills, packaging, and pneumatic automation sectors across India.' },
]

const TEAM = [
  { initials: 'AK', name: 'Mr. A. Kumar', role: 'Managing Director', bio: '20 years in thermoplastic polymer processing. Leads product strategy and government relations for SK Industry.' },
  { initials: 'RS', name: 'Mr. R. Sharma', role: 'Quality Assurance Head', bio: 'BIS auditor-certified. Manages IS 447 and IS 12585 compliance, batch testing, and OEM PPAP documentation.' },
  { initials: 'PM', name: 'Ms. P. Mehta', role: 'National Sales Manager', bio: 'Handles key account OEM relationships, government tender submissions, and bulk B2B trade enquiries across India.' },
]

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* 1. Hero Section */}
      <section className="bg-[#1E3A8A] text-white min-h-[520px] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg,white 0,white 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,white 0,white 1px,transparent 1px,transparent 40px)'
        }}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3.5 py-1 text-xs sm:text-sm text-blue-200 mb-5 sm:mb-6 max-w-full truncate">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] shrink-0 animate-pulse"/>
              <span className="truncate">BIS-Certified Industrial Hose Manufacturer</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 sm:mb-6" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Engineering High-Performance{' '}
              <span className="text-[#F59E0B]">Industrial Hoses</span>{' '}
              & Pneumatic Conveyance Solutions.
            </h1>
            <p className="text-blue-200 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 max-w-lg">
              SK Industry delivers BIS-certified, heavy-duty thermoplastic hoses, PU tubing, and PVC braided solutions built with unwavering commitment to quality, durability, and extreme pressure resilience.
            </p>
            <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
              {TRUST_BADGES.map(b => (
                <div key={b.label} className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-medium text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shrink-0"/>
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/products" className="w-full sm:w-auto text-center bg-[#F59E0B] text-[#162d6e] font-bold px-6 py-3 rounded-lg hover:bg-amber-400 transition-colors text-xs sm:text-sm shadow-md">
                Explore Product Range →
              </Link>
              <Link to="/contact" className="w-full sm:w-auto text-center border border-white/40 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors text-xs sm:text-sm">
                Request Bulk Quotation
              </Link>
            </div>
          </div>

          <div className="relative mt-4 lg:mt-0">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-8 backdrop-blur-sm">
              <div className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#F59E0B] mb-2">Corporate Profile & Capacity</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                Direct Factory Manufacturing — Noida Works
              </h3>
              <div className="space-y-3 sm:space-y-4 text-blue-100 text-xs sm:text-sm leading-relaxed mb-6">
                <p>
                  BIS-certified thermoplastic hose manufacturing facility equipped with advanced multi-layer extrusion lines, yarn cross-braiding decks, and continuous hydrostatic proof testing rigs.
                </p>
                <p>
                  Supplying Tier-1 automotive plants, pneumatic machinery builders, steel processing mills, and infrastructure contractors across India.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#F59E0B]" style={{ fontFamily: 'JetBrains Mono' }}>20+ Yrs</div>
                  <div className="text-[11px] sm:text-xs text-blue-200">Industrial Heritage</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#F59E0B]" style={{ fontFamily: 'JetBrains Mono' }}>100%</div>
                  <div className="text-[11px] sm:text-xs text-blue-200">In-House Batch Tested</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Value Cards (Pressure, Temperature, Standards, Sheathing) */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F59E0B] mb-2">Engineered Resilience</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E3A8A]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Built for Demanding Industrial Environments
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {VALUE_CARDS.map(c => (
              <div key={c.title} className="bg-white rounded-xl border border-[#E2E8F0] p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-[#1E3A8A] transition-all group">
                <div className="mb-3 sm:mb-4">{c.icon}</div>
                <div className="text-[11px] sm:text-xs font-bold text-[#F59E0B] uppercase tracking-wider mb-1" style={{ fontFamily: 'JetBrains Mono' }}>{c.sub}</div>
                <div className="text-xl sm:text-2xl font-black text-[#1E3A8A] mb-2" style={{ fontFamily: 'JetBrains Mono' }}>{c.stat}</div>
                <h3 className="font-bold text-slate-900 mb-1.5 group-hover:text-[#1E3A8A] transition-colors text-sm sm:text-base" style={{ fontFamily: 'Plus Jakarta Sans' }}>{c.title}</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Core Manufacturing Range (Engineered Hose Lines) */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-white border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-3">
            <div>
              <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F59E0B] mb-1 sm:mb-2">Core Manufacturing Range</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E3A8A]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                Engineered Hose Lines
              </h2>
            </div>
            <Link to="/products" className="text-xs sm:text-sm font-bold text-[#1E3A8A] hover:text-[#F59E0B] transition-colors flex items-center gap-1">
              View All Technical Spec Tables & Pressure Ratings →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {PRODUCTS_PREVIEW.map(p => (
              <div key={p.id} className="bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-5 sm:p-6 shadow-sm flex flex-col justify-between hover:border-[#1E3A8A] hover:shadow-md transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 bg-blue-50 text-[#1E3A8A] rounded border border-blue-100">{p.code} Series</span>
                    <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono text-right">{p.spec}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 sm:mb-3" style={{ fontFamily: 'Plus Jakarta Sans' }}>{p.name}</h3>
                  <div className="flex flex-wrap gap-1 mb-4 sm:mb-6">
                    {p.tags.map(t => (
                      <span key={t} className="text-[11px] px-2 py-0.5 bg-white text-slate-600 rounded border border-slate-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  to={`/products?category=${p.id}`}
                  className="text-xs font-bold text-[#1E3A8A] hover:text-[#F59E0B] transition-colors flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-200"
                >
                  <span>Explore Dimensional Specs</span>
                  <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Industries We Serve: 8 Industrial Application Sectors (Shifted with Pictures) */}
      <section id="applications" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#F8FAFC] border-t border-[#E2E8F0] scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F59E0B] mb-2">Industries We Serve</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E3A8A]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              8 Industrial Application Sectors
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-2xl mx-auto mt-2">
              SK Industry fluid conveyance systems engineered for heavy machinery, automated manufacturing lines, and aggressive transfer media across India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {INDUSTRIES.map(ind => (
              <div key={ind.title} className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-[#1E3A8A] transition-all">
                <div>
                  <div className="h-40 sm:h-44 relative overflow-hidden bg-slate-900">
                    <img
                      src={ind.img}
                      alt={ind.title}
                      className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center text-base">
                      {ind.icon}
                    </span>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base mb-1.5 leading-snug" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                      {ind.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed mb-3 sm:mb-4">{ind.desc}</p>
                    <div className="space-y-1 pt-3 border-t border-slate-200">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Recommended Lines:</div>
                      {ind.products.map(p => (
                        <div key={p} className="text-xs text-[#1E3A8A] font-semibold flex items-center gap-1.5">
                          <span className="text-[#F59E0B]">›</span> <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-5 pt-0">
                  <Link
                    to={`/contact?product=${encodeURIComponent(ind.title)}`}
                    className="block w-full py-2 bg-slate-50 border border-slate-200 hover:bg-[#1E3A8A] hover:text-white hover:border-[#1E3A8A] text-[#1E3A8A] rounded-lg text-center text-xs font-bold transition-colors shadow-sm"
                  >
                    Request Sector Quote →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Company Story & P-Q-R Operating Model & 20-Year Timeline */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-white border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F59E0B] mb-2 sm:mb-3">Company Heritage & Vision</div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E3A8A] mb-4 sm:mb-6 leading-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                Built on P — Q — R Operating Excellence
              </h2>
              <div className="space-y-3 sm:space-y-4 text-slate-600 leading-relaxed text-xs sm:text-sm">
                <p>
                  SK Industry was founded with one clear conviction: Indian manufacturing deserves high-performance industrial hose products built to stringent international tolerances, offered at factory-direct pricing without distributor markups, and backed by genuine in-house laboratory testing.
                </p>
                <p>
                  We structured our entire operation around <strong className="text-slate-900">P–Q–R</strong>:
                </p>
                <div className="space-y-2.5 pl-3 border-l-2 border-[#F59E0B] my-3 sm:my-4">
                  <div>
                    <span className="font-bold text-[#1E3A8A]">Performance:</span> High-tenacity yarn reinforcements tested to minimum 3× and 4× burst safety factors under extreme pressure surges.
                  </div>
                  <div>
                    <span className="font-bold text-[#1E3A8A]">Quality:</span> Pure virgin modified thermoplastic alloys, ether-based TPUs, and food-grade formulations complying with RoHS, REACH, and IS standards.
                  </div>
                  <div>
                    <span className="font-bold text-[#1E3A8A]">Reliability:</span> Dependable dispatch schedules, full Mill Test Certificates (MTC), and transparent engineering support directly from Noida Works.
                  </div>
                </div>
                <p>
                  BIS licensing under IS 447 (Welding Hoses) and IS 12585 (Fire Hose Reels), paired with our internal testing laboratory, ensure zero-defect production across every single reel that leaves our facility.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-100">
                {[
                  ['20+', 'Years Experience'],
                  ['6', 'BIS Lines'],
                  ['CML 8700036611', 'BIS License'],
                  ['< 24hr', 'RFQ Response']
                ].map(([val, label]) => (
                  <div key={label} className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-4 text-center">
                    <div className="text-base sm:text-lg font-bold text-[#1E3A8A] font-mono">{val}</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 20-Year Timeline */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5 sm:p-8 shadow-sm">
              <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F59E0B] mb-2">Milestone Journey</div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#1E3A8A] mb-5 sm:mb-6" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                Two Decades of Polymer Engineering
              </h3>
              <div className="relative border-l-2 border-[#CBD5E1] pl-5 sm:pl-6 space-y-5 sm:space-y-6">
                {TIMELINE.map(t => (
                  <div key={t.year} className="relative">
                    <div className="absolute -left-[27px] sm:-left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#F59E0B] border-2 border-white shadow-sm"/>
                    <div className="text-xs font-bold text-[#1E3A8A] mb-0.5 font-mono">{t.year}</div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Leadership & Technical Team */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F59E0B] mb-2">Leadership & Technical Expertise</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E3A8A]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              The People Behind the Product
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto mt-2">
              Combining 40+ years of polymer processing, certified BIS auditing, and national industrial procurement experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {TEAM.map(t => (
              <div key={t.name} className="bg-white rounded-xl border border-[#E2E8F0] p-5 sm:p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center mx-auto mb-3 sm:mb-4 font-extrabold text-base sm:text-lg" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                  {t.initials}
                </div>
                <h3 className="font-bold text-[#1E3A8A] mb-0.5 text-sm sm:text-base" style={{ fontFamily: 'Plus Jakarta Sans' }}>{t.name}</h3>
                <div className="text-[11px] sm:text-xs font-semibold text-[#F59E0B] mb-2 sm:mb-3">{t.role}</div>
                <p className="text-slate-600 text-xs leading-relaxed">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Bottom Conversion CTA */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-[#1E3A8A] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F59E0B] mb-2 sm:mb-3">Direct Works Pricing</div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3 sm:mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            Ready to Partner With India's Leading Industrial Hose Manufacturer?
          </h2>
          <p className="text-blue-200 text-xs sm:text-base mb-6 sm:mb-8 max-w-2xl mx-auto">
            Get factory-direct pricing on custom lengths, bulk OEM orders, or standard reels. All quotes acknowledged within 24 working hours.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link to="/contact" className="w-full sm:w-auto text-center bg-[#F59E0B] text-[#162d6e] font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg hover:bg-amber-400 transition-colors text-xs sm:text-sm shadow-md">
              Submit Technical RFQ Online →
            </Link>
            <Link to="/products" className="w-full sm:w-auto text-center border border-white/40 text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg hover:bg-white/10 transition-colors text-xs sm:text-sm">
              Inspect Spec Tables & Certificates
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
