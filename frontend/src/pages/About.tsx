import { Link } from 'react-router'

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

export default function About() {
  return (
    <>
      <section className="bg-[#1E3A8A] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F59E0B] mb-3">About SK Industry</div>
            <h1 className="text-3xl lg:text-5xl font-extrabold mb-4 leading-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              India's Fastest Growing Industrial Hose Manufacturer
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              SK Industry is a BIS-certified thermoplastic hose manufacturer based in Navi Mumbai. We supply OEM, trade, and government customers across India — factory-direct, with 100% batch-tested quality.
            </p>
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {[['20+','Years Manufacturing'],['6','BIS Certified Lines'],['CML 8700036611','Govt Approved'],['24hr','RFQ Response']].map(([val, label]) => (
              <div key={label} className="bg-white/10 border border-white/20 rounded-xl p-6 text-center">
                <div className="text-2xl font-extrabold text-[#F59E0B]" style={{ fontFamily: 'JetBrains Mono' }}>{val}</div>
                <div className="text-slate-300 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F59E0B] mb-3">Our Story</div>
            <h2 className="text-3xl font-extrabold text-[#1E3A8A] mb-6" style={{ fontFamily: 'Plus Jakarta Sans' }}>Built on P — Q — R</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-sm">
              <p>
                SK Industry was founded with one conviction: Indian industry deserves industrial hose products manufactured to international quality standards, available at factory-direct prices, backed by genuine in-house testing — not just certificates.
              </p>
              <p>
                We structured our entire operation around P–Q–R: Performance through rigorous in-house testing, Quality through Total Quality Management using global-standard polymers, and Reliability demonstrated by consistent on-spec delivery to automotive OEMs, steel mills, and government bodies.
              </p>
              <p>
                BIS certification under IS 447 and IS 12585:1988, our own testing laboratory, and a zero-defect production approach are not marketing claims — they are the operating model that has made SK Industry one of India's fastest-growing thermoplastic hose manufacturers.
              </p>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F59E0B] mb-3">Company Timeline</div>
            <div className="relative border-l-2 border-[#E2E8F0] pl-8 space-y-6">
              {TIMELINE.map(t => (
                <div key={t.year} className="relative">
                  <div className="absolute -left-10 w-4 h-4 rounded-full bg-[#F59E0B] border-2 border-white shadow-sm"/>
                  <div className="text-xs font-bold text-[#F59E0B] mb-0.5" style={{ fontFamily: 'JetBrains Mono' }}>{t.year}</div>
                  <p className="text-slate-600 text-sm leading-relaxed">{t.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F8FAFC] border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F59E0B] mb-3">Leadership Team</div>
            <h2 className="text-3xl font-extrabold text-[#1E3A8A]" style={{ fontFamily: 'Plus Jakarta Sans' }}>The People Behind the Product</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {TEAM.map(t => (
              <div key={t.name} className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center mx-auto mb-4 font-extrabold" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                  {t.initials}
                </div>
                <h3 className="font-bold text-[#1E3A8A] mb-0.5" style={{ fontFamily: 'Plus Jakarta Sans' }}>{t.name}</h3>
                <div className="text-xs font-semibold text-[#F59E0B] mb-3">{t.role}</div>
                <p className="text-slate-500 text-sm leading-relaxed">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#1E3A8A]">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-extrabold mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            Partner with SK Industry
          </h2>
          <p className="text-slate-300 mb-8 leading-relaxed">
            OEM supply agreements, long-term trade contracts, government vendor registration, and custom specification manufacturing. Contact us to start the conversation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="bg-[#F59E0B] text-white font-bold px-6 py-3 rounded-md hover:bg-[#d97706] transition-colors text-sm">Get in Touch →</Link>
            <Link to="/products" className="border border-white/30 text-white font-semibold px-6 py-3 rounded-md hover:bg-white/10 transition-colors text-sm">View Product Range</Link>
          </div>
        </div>
      </section>
    </>
  )
}
