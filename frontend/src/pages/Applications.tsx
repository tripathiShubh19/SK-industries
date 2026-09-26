import { Link } from 'react-router'

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

export default function Applications() {
  return (
    <>
      <section className="bg-[#1E3A8A] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F59E0B] mb-3">Industries We Serve</div>
          <h1 className="text-3xl lg:text-5xl font-extrabold mb-4 leading-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            8 Industrial Application Sectors
          </h1>
          <p className="text-slate-300 max-w-2xl text-lg">
            SK Industry hoses and fluid conveyance products engineered for the real demands of India's core industrial sectors.
          </p>
        </div>
      </section>

      {/* 8-card icon grid overview */}
      <section className="py-12 px-6 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {INDUSTRIES.map(ind => (
              <a key={ind.title} href={`#${ind.title.toLowerCase().replace(/[^a-z]/g, '-').replace(/-+/g, '-')}`}
                className="flex flex-col items-center justify-center text-center p-4 rounded-xl border border-[#E2E8F0] bg-white hover:border-[#F59E0B] hover:shadow-sm transition-all gap-2 cursor-pointer">
                <span className="text-2xl">{ind.icon}</span>
                <span className="text-[10px] font-semibold text-slate-600 leading-tight">{ind.title.split(' ').slice(0, 3).join(' ')}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed cards */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-10">
          {INDUSTRIES.map((ind, i) => {
            const anchor = ind.title.toLowerCase().replace(/[^a-z]/g, '-').replace(/-+/g, '-')
            return (
              <div key={ind.title} id={anchor} className={`scroll-mt-24 grid lg:grid-cols-2 rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}>
                <div className="bg-slate-200 min-h-[260px]" style={{ direction: 'ltr' }}>
                  <img src={ind.img} alt={ind.title} className="w-full h-full object-cover min-h-[260px]"/>
                </div>
                <div className="p-8 flex flex-col justify-center" style={{ direction: 'ltr' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{ind.icon}</span>
                    <h2 className="text-xl font-extrabold text-[#1E3A8A]" style={{ fontFamily: 'Plus Jakarta Sans' }}>{ind.title}</h2>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-5 text-sm">{ind.desc}</p>
                  <div className="mb-5">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Recommended ARK Products</div>
                    <ul className="space-y-1.5">
                      {ind.products.map(p => (
                        <li key={p} className="flex items-center gap-2 text-sm text-slate-700">
                          <span className="text-[#F59E0B] font-bold">→</span>{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-3">
                    <Link to="/products" className="text-sm font-semibold border border-[#1E3A8A] text-[#1E3A8A] rounded-md px-4 py-2 hover:bg-[#1E3A8A] hover:text-white transition-colors">Browse Products</Link>
                    <Link to="/contact" className="text-sm font-semibold bg-[#F59E0B] text-white rounded-md px-4 py-2 hover:bg-[#d97706] transition-colors">Get Quote</Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
