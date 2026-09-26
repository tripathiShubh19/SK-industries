import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'

type SpecRow = {
  code: string; od_mm: string; od_in: string;
  id_mm: string; id_in: string; wp_bar: string; wp_psi: string;
  bp_bar: string; bp_psi: string; bend_mm: string;
  tolerance?: string;
  priceRoll?: string;
  priceMeter?: string;
}

const SPEC_DATA: Record<string, SpecRow[]> = {
  'Thermoplastic': [
    { code: 'TM-04', od_mm: '11.5', od_in: '0.45"', id_mm: '6.3', id_in: '1/4"', wp_bar: '20', wp_psi: '290', bp_bar: '60', bp_psi: '870', bend_mm: '50' },
    { code: 'TM-06', od_mm: '13.0', od_in: '0.51"', id_mm: '8.0', id_in: '5/16"', wp_bar: '20', wp_psi: '290', bp_bar: '60', bp_psi: '870', bend_mm: '65' },
    { code: 'TM-08', od_mm: '16.5', od_in: '0.65"', id_mm: '10.0', id_in: '3/8"', wp_bar: '20', wp_psi: '290', bp_bar: '60', bp_psi: '870', bend_mm: '80' },
    { code: 'TM-12', od_mm: '19.0', od_in: '0.75"', id_mm: '12.5', id_in: '1/2"', wp_bar: '20', wp_psi: '290', bp_bar: '60', bp_psi: '870', bend_mm: '100' },
    { code: 'TM-16', od_mm: '23.5', od_in: '0.93"', id_mm: '16.0', id_in: '5/8"', wp_bar: '20', wp_psi: '290', bp_bar: '60', bp_psi: '870', bend_mm: '130' },
    { code: 'TM-25', od_mm: '32.0', od_in: '1.26"', id_mm: '25.0', id_in: '1"', wp_bar: '15', wp_psi: '218', bp_bar: '45', bp_psi: '653', bend_mm: '200' },
  ],
  'Air/Water': [
    { code: 'AW-06', od_mm: '13.5', od_in: '0.53"', id_mm: '6.3', id_in: '1/4"', wp_bar: '16', wp_psi: '232', bp_bar: '48', bp_psi: '696', bend_mm: '55' },
    { code: 'AW-10', od_mm: '18.0', od_in: '0.71"', id_mm: '10.0', id_in: '3/8"', wp_bar: '14', wp_psi: '203', bp_bar: '42', bp_psi: '609', bend_mm: '85' },
    { code: 'AW-12', od_mm: '20.5', od_in: '0.81"', id_mm: '12.5', id_in: '1/2"', wp_bar: '12', wp_psi: '174', bp_bar: '36', bp_psi: '522', bend_mm: '100' },
    { code: 'AW-19', od_mm: '28.5', od_in: '1.12"', id_mm: '19.0', id_in: '3/4"', wp_bar: '10', wp_psi: '145', bp_bar: '30', bp_psi: '435', bend_mm: '150' },
    { code: 'AW-25', od_mm: '35.0', od_in: '1.38"', id_mm: '25.4', id_in: '1"', wp_bar: '10', wp_psi: '145', bp_bar: '30', bp_psi: '435', bend_mm: '190' },
    { code: 'AW-50', od_mm: '62.5', od_in: '2.46"', id_mm: '50.8', id_in: '2"', wp_bar: '8', wp_psi: '116', bp_bar: '24', bp_psi: '348', bend_mm: '350' },
  ],
  'PVC Braided': [
    { code: 'PVC-L06', od_mm: '10.0', od_in: '0.39"', id_mm: '6.0', id_in: '1/4"', wp_bar: '12', wp_psi: '174', bp_bar: '36', bp_psi: '522', bend_mm: '40' },
    { code: 'PVC-L10', od_mm: '15.0', od_in: '0.59"', id_mm: '10.0', id_in: '3/8"', wp_bar: '10', wp_psi: '145', bp_bar: '30', bp_psi: '435', bend_mm: '65' },
    { code: 'PVC-H08', od_mm: '14.5', od_in: '0.57"', id_mm: '8.0', id_in: '5/16"', wp_bar: '28', wp_psi: '406', bp_bar: '84', bp_psi: '1218', bend_mm: '60' },
    { code: 'PVC-H12', od_mm: '18.5', od_in: '0.73"', id_mm: '12.5', id_in: '1/2"', wp_bar: '24', wp_psi: '348', bp_bar: '72', bp_psi: '1044', bend_mm: '90' },
    { code: 'PVC-H19', od_mm: '27.0', od_in: '1.06"', id_mm: '19.0', id_in: '3/4"', wp_bar: '20', wp_psi: '290', bp_bar: '60', bp_psi: '870', bend_mm: '140' },
    { code: 'PVC-H50', od_mm: '62.0', od_in: '2.44"', id_mm: '50.0', id_in: '2"', wp_bar: '12', wp_psi: '174', bp_bar: '36', bp_psi: '522', bend_mm: '350' },
  ],
  'PU Tubing': [
    { code: 'AMPU0425', od_mm: '4.0', od_in: '5/32"', id_mm: '2.5', id_in: '3/32"', wp_bar: '10', wp_psi: '145', bp_bar: '30', bp_psi: '435', bend_mm: '12', tolerance: '0.10', priceRoll: '₹1,450', priceMeter: '₹14.50' },
    { code: 'AMPU0604', od_mm: '6.0', od_in: '1/4"', id_mm: '4.0', id_in: '5/32"', wp_bar: '10', wp_psi: '145', bp_bar: '30', bp_psi: '435', bend_mm: '18', tolerance: '0.10', priceRoll: '₹2,100', priceMeter: '₹21.00' },
    { code: 'AMPU0805', od_mm: '8.0', od_in: '5/16"', id_mm: '5.0', id_in: '13/64"', wp_bar: '10', wp_psi: '145', bp_bar: '30', bp_psi: '435', bend_mm: '22', tolerance: '0.10', priceRoll: '₹3,400', priceMeter: '₹34.00' },
    { code: 'AMPU0855', od_mm: '8.0', od_in: '5/16"', id_mm: '5.5', id_in: '7/32"', wp_bar: '10', wp_psi: '145', bp_bar: '30', bp_psi: '435', bend_mm: '24', tolerance: '0.10', priceRoll: '₹3,300', priceMeter: '₹33.00' },
    { code: 'AMPU0806', od_mm: '8.0', od_in: '5/16"', id_mm: '6.0', id_in: '1/4"', wp_bar: '10', wp_psi: '145', bp_bar: '30', bp_psi: '435', bend_mm: '25', tolerance: '0.10', priceRoll: '₹3,000', priceMeter: '₹30.00' },
    { code: 'AMPU1065', od_mm: '10.0', od_in: '3/8"', id_mm: '6.5', id_in: '1/4"', wp_bar: '10', wp_psi: '145', bp_bar: '30', bp_psi: '435', bend_mm: '30', tolerance: '0.10', priceRoll: '₹5,400', priceMeter: '₹54.00' },
    { code: 'AMPU1008', od_mm: '10.0', od_in: '3/8"', id_mm: '8.0', id_in: '5/16"', wp_bar: '10', wp_psi: '145', bp_bar: '30', bp_psi: '435', bend_mm: '32', tolerance: '0.12', priceRoll: '₹4,500', priceMeter: '₹45.00' },
    { code: 'AMPU1208', od_mm: '12.0', od_in: '1/2"', id_mm: '8.0', id_in: '5/16"', wp_bar: '10', wp_psi: '145', bp_bar: '30', bp_psi: '435', bend_mm: '36', tolerance: '0.15', priceRoll: '₹7,200', priceMeter: '₹72.00' },
    { code: 'AMPU1209', od_mm: '12.0', od_in: '1/2"', id_mm: '9.0', id_in: '23/64"', wp_bar: '10', wp_psi: '145', bp_bar: '30', bp_psi: '435', bend_mm: '38', tolerance: '0.15', priceRoll: '₹6,200', priceMeter: '₹62.00' },
    { code: 'AMPU1210', od_mm: '12.0', od_in: '1/2"', id_mm: '10.0', id_in: '3/8"', wp_bar: '10', wp_psi: '145', bp_bar: '30', bp_psi: '435', bend_mm: '40', tolerance: '0.15', priceRoll: '₹5,100', priceMeter: '₹51.00' },
    { code: 'AMPU1410', od_mm: '14.0', od_in: '9/16"', id_mm: '10.0', id_in: '3/8"', wp_bar: '8', wp_psi: '116', bp_bar: '24', bp_psi: '348', bend_mm: '45', tolerance: '0.15', priceRoll: '₹9,500', priceMeter: '₹95.00' },
    { code: 'AMPU1612', od_mm: '16.0', od_in: '5/8"', id_mm: '12.0', id_in: '1/2"', wp_bar: '8', wp_psi: '116', bp_bar: '24', bp_psi: '348', bend_mm: '55', tolerance: '0.15', priceRoll: '₹11,500', priceMeter: '₹115.00' },
  ],
  'Welding': [
    { code: 'WH-05', od_mm: '9.5', od_in: '3/8"', id_mm: '5.0', id_in: '3/16"', wp_bar: '20', wp_psi: '290', bp_bar: '60', bp_psi: '870', bend_mm: '55' },
    { code: 'WH-06', od_mm: '11.5', od_in: '7/16"', id_mm: '6.3', id_in: '1/4"', wp_bar: '20', wp_psi: '290', bp_bar: '60', bp_psi: '870', bend_mm: '70' },
    { code: 'WH-08', od_mm: '13.0', od_in: '1/2"', id_mm: '8.0', id_in: '5/16"', wp_bar: '20', wp_psi: '290', bp_bar: '60', bp_psi: '870', bend_mm: '80' },
  ],
  'Fire Reel': [
    { code: 'FH-19', od_mm: '28.0', od_in: '1.10"', id_mm: '19.0', id_in: '3/4"', wp_bar: '12', wp_psi: '174', bp_bar: '48', bp_psi: '696', bend_mm: '150' },
    { code: 'FH-25', od_mm: '35.0', od_in: '1.38"', id_mm: '25.4', id_in: '1"', wp_bar: '12', wp_psi: '174', bp_bar: '48', bp_psi: '696', bend_mm: '190' },
    { code: 'FH-32', od_mm: '44.0', od_in: '1.73"', id_mm: '32.0', id_in: '1¼"', wp_bar: '10', wp_psi: '145', bp_bar: '40', bp_psi: '580', bend_mm: '230' },
  ],
}

const PROMAX_RECOIL_DATA = [
  { code: 'PUC-0604', size: '6×4 mm', p3m: '₹96', p5m: '₹160', p10m: '₹320', p15m: '₹480' },
  { code: 'PUC-0805', size: '8×5 mm', p3m: '₹135', p5m: '₹225', p10m: '₹450', p15m: '₹675' },
  { code: 'PUC-1065', size: '10×6.5 mm', p3m: '₹195', p5m: '₹325', p10m: '₹650', p15m: '₹975' },
  { code: 'PUC-1208', size: '12×8 mm', p3m: '₹246', p5m: '₹410', p10m: '₹820', p15m: '₹1,230' },
]

const SPEC_TABS = ['Thermoplastic', 'Air/Water', 'PVC Braided', 'PU Tubing', 'Welding', 'Fire Reel'] as const

const MECH_SPECS = {
  'Thermoplastic': { tensile_lin: '10 N/mm²', tensile_cov: '14 N/mm²', elong_lin: '220%', elong_cov: '300%', adhesion: '≥ 2.5 kN/m' },
  'Air/Water': { tensile_lin: '10 N/mm²', tensile_cov: '12 N/mm²', elong_lin: '200%', elong_cov: '280%', adhesion: '≥ 2.0 kN/m' },
  'PVC Braided': { tensile_lin: '—', tensile_cov: '—', elong_lin: '—', elong_cov: '—', adhesion: '≥ 1.5 kN/m' },
  'PU Tubing': { tensile_lin: '30 N/mm²', tensile_cov: '30 N/mm²', elong_lin: '400%', elong_cov: '400%', adhesion: 'N/A (monowall)' },
  'Welding': { tensile_lin: '10 N/mm²', tensile_cov: '14 N/mm²', elong_lin: '220%', elong_cov: '300%', adhesion: '≥ 2.5 kN/m' },
  'Fire Reel': { tensile_lin: '12 N/mm²', tensile_cov: '16 N/mm²', elong_lin: '200%', elong_cov: '250%', adhesion: '≥ 2.5 kN/m' },
}

const PRODUCTS = [
  {
    id: 'thermoplastic',
    code: 'TM',
    name: 'Thermoplastic Multipurpose Hose',
    tags: ['ID: 1/4" to 1"', 'WP: 20 Bar', 'UV Resistant', 'Silicon-free'],
    desc: 'Single synthetic braid thermoplastic hose. Lightweight rubber substitute for pneumatic tools, air compressors, water discharge, and general industrial use. Push-to-connect fitting compatible. Ozone and UV resistant outer jacket.',
    details: ['ID range: 6.3mm (1/4") to 25mm (1")', 'Working pressure: 20 Bar (290 PSI)', 'Burst pressure: 60 Bar (870 PSI)', 'Silicon-free inner lining', 'UV & ozone resistant outer cover', 'Push-to-connect fitting ready'],
    tab: 'Thermoplastic' as const,
  },
  {
    id: 'airwater',
    code: 'AW',
    name: 'Air / Water Hose',
    tags: ['ID: 1/4" to 2"', 'WP: 10–16 Bar', 'Heavy Industrial'],
    desc: 'Heavy-duty thermoplastic hose for compressed air and water discharge in industrial environments. High repetitive flexing resistance. Suitable for pneumatic tools, compressor lines, and construction site water supply.',
    details: ['ID range: 6.3mm (1/4") to 50.8mm (2")', 'WP: 10–16 Bar depending on size', 'High repetitive flexing resistance', 'Abrasion-resistant outer cover', 'Compatible with air and water media', 'Industrial duty construction'],
    tab: 'Air/Water' as const,
  },
  {
    id: 'pvc',
    code: 'PVC',
    name: 'PVC Braided Hose — Light & Heavy Duty',
    tags: ['ID: 6–50mm', 'WP: up to 28 Bar', 'Non-toxic', 'Mirror-smooth bore'],
    desc: 'Non-toxic mirror-smooth inner core PVC hose. Light duty (PVC-L) for general fluid and water transfer. Heavy duty (PVC-H) for elevated pressures up to 28 Bar. Available in transparent for visual flow monitoring.',
    details: ['ID range: 6mm to 50mm', 'Light duty WP: 10–12 Bar', 'Heavy duty WP: up to 28 Bar', 'Mirror-smooth non-toxic inner bore', 'Food-grade variants available on request', 'Transparent body for flow monitoring'],
    tab: 'PVC Braided' as const,
  },
  {
    id: 'pu',
    code: 'PU',
    name: 'PROMAX PU Tubing & Re-Coil Hoses',
    tags: ['Shore 98A', 'AMPU Series', 'Price List 10-07-2024', '3m–15m Recoil', 'Tolerances: 0.10–0.15mm'],
    desc: 'PROMAX high-precision Polyurethane (PU) tubing (AMPU0425–AMPU1612) and Re-Coil spring hoses (3m, 5m, 10m, 15m). Virgin TPU matrix, 100m standard roll length, one-touch push-in fitting ready. Official factory wholesale price list available.',
    details: [
      'AMPU Series: 4×2.5mm up to 16×12mm precision metric sizes',
      'Tolerance range: 0.10mm to 0.15mm for zero-leak push-in couplings',
      'Standard Length: 100 meters per coil / roll',
      'PROMAX Re-Coil Spring Hoses: 3m, 5m, 10m, 15m with factory fittings',
      'Wholesale pricing: ₹14.50/m (AMPU0425) to ₹115.00/m (AMPU1612)',
      'GST @ 18% extra as applicable | Delhi Jurisdiction'
    ],
    tab: 'PU Tubing' as const,
  },
  {
    id: 'welding',
    code: 'WH',
    name: 'Thermoplastic Welding Hose',
    tags: ['IS 447 BIS Approved', 'Red/Blue color coded', 'Rodent proof', 'Kink resistant'],
    desc: 'BIS IS 447 approved thermoplastic welding hoses. Red for Acetylene, Blue for Oxygen. Rodent-proof outer jacket. Kink-resistant construction for freedom of movement on the welding floor. Anti-static inner lining.',
    details: ['IS 447 BIS certified (CML No. 8700036611)', 'Red: Acetylene / Blue: Oxygen colour coding', 'Rodent-proof outer jacket compound', 'Kink-resistant flexible construction', 'Anti-static inner lining', 'ID: 5mm, 6.3mm, 8mm — single and twin line'],
    tab: 'Welding' as const,
  },
  {
    id: 'fire',
    code: 'FH',
    name: 'Fire Hose Reel Hose',
    tags: ['IS 12585:1988', 'WP: 12 Bar', 'BP: 48 Bar', 'Flame retardant'],
    desc: 'IS 12585:1988 Type 1 and Type 2 certified fire hose reel hoses. Flame-retardant red/black outer cover. Designed for 30m hose reel systems in buildings and industrial facilities. Approved for government procurement.',
    details: ['IS 12585:1988 Type 1: DN 19mm', 'IS 12585:1988 Type 2: DN 25mm', 'WP: 10–12 Bar | BP: 40–48 Bar', 'Flame-retardant outer compound', 'Red/black outer cover — high visibility', 'Approved for government and public building contracts'],
    tab: 'Fire Reel' as const,
  },
]

// Quality & Standards Data
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

export default function Products() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState<typeof SPEC_TABS[number]>('Thermoplastic')
  const [search, setSearch] = useState('')
  const [mainSection, setMainSection] = useState<'catalog' | 'quality'>('catalog')

  useEffect(() => {
    const hash = location.hash.replace('#', '')
    if (hash === 'quality') {
      setMainSection('quality')
      document.getElementById('quality-section')?.scrollIntoView({ behavior: 'smooth' })
      return
    }

    const product = PRODUCTS.find(p => p.id === hash)
    if (product) {
      setMainSection('catalog')
      setActiveTab(product.tab)
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }

    const params = new URLSearchParams(location.search)
    const code = params.get('code')
    if (code) setSearch(code)

    const cat = params.get('category')
    if (cat) {
      const match = PRODUCTS.find(p => p.id === cat)
      if (match) setActiveTab(match.tab)
    }
  }, [location])

  const rows = SPEC_DATA[activeTab].filter(r =>
    r.code.toLowerCase().includes(search.toLowerCase()) ||
    r.id_mm.includes(search) ||
    r.od_mm.includes(search)
  )

  const mech = MECH_SPECS[activeTab]

  return (
    <div className="w-full overflow-x-hidden">
      {/* 1. Page Header with Quick Section Switcher */}
      <section className="bg-[#1E3A8A] text-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F59E0B] mb-2 sm:mb-3">
            Engineering & Product Solutions
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 leading-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            Products, Specifications & Quality
          </h1>
          <p className="text-slate-300 max-w-3xl text-sm sm:text-base lg:text-lg mb-6 sm:mb-8">
            Explore complete technical specifications, dimensional tolerance tables, and Bureau of Indian Standards (BIS) test certifications.
          </p>

          {/* Section Navigation Tabs */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 pt-1 sm:pt-2">
            <button
              onClick={() => {
                setMainSection('catalog')
                document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm text-center ${
                mainSection === 'catalog'
                  ? 'bg-[#F59E0B] text-slate-900 shadow-amber-500/20'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
              }`}
            >
              📦 Product Catalog & Spec Tables
            </button>
            <button
              onClick={() => {
                setMainSection('quality')
                document.getElementById('quality-section')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm text-center ${
                mainSection === 'quality'
                  ? 'bg-[#F59E0B] text-slate-900 shadow-amber-500/20'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
              }`}
            >
              🛡️ Quality Assurance & In-House Lab
            </button>
            <Link
              to="/#applications"
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm text-center bg-white/10 text-white hover:bg-white/20 border border-white/10 flex items-center justify-center gap-1.5"
            >
              <span>🏭</span> View 8 Industry Applications (Overview) →
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SECTION: Product Cards Showcase */}
      <section id="catalog-section" className="py-10 sm:py-14 px-4 sm:px-6 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E3A8A]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Core Industrial Hose Families
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Select any family to inspect mechanical properties, burst curves, and complete dimensional tables.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {PRODUCTS.map(p => (
              <div key={p.id} id={p.id} className="scroll-mt-24 rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-[#1E3A8A] px-4 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#F59E0B] flex items-center justify-center shrink-0">
                      <span className="text-white text-xs sm:text-sm font-extrabold" style={{ fontFamily: 'JetBrains Mono' }}>{p.code}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-extrabold text-base sm:text-xl" style={{ fontFamily: 'Plus Jakarta Sans' }}>{p.name}</h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {p.tags.map(t => <span key={t} className="text-[10px] sm:text-xs font-medium bg-white/10 border border-white/20 rounded-full px-2 sm:px-2.5 py-0.5 text-slate-300">{t}</span>)}
                      </div>
                    </div>
                  </div>
                  <Link
                    to={`/contact?product=${encodeURIComponent(p.name)}`}
                    className="w-full sm:w-auto text-center bg-[#F59E0B] hover:bg-amber-500 text-slate-900 font-bold px-4 py-2 rounded-lg text-xs transition-colors shrink-0"
                  >
                    Quick RFQ for this Series →
                  </Link>
                </div>

                <div className="p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                  <div className="lg:col-span-2">
                    <p className="text-slate-600 leading-relaxed mb-4 sm:mb-5 text-xs sm:text-sm">{p.desc}</p>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <button
                        onClick={() => { setActiveTab(p.tab); document.getElementById('spec-table')?.scrollIntoView({ behavior: 'smooth' }) }}
                        className="w-full sm:w-auto text-center text-xs font-bold border border-[#1E3A8A] text-[#1E3A8A] rounded-lg px-4 py-2.5 hover:bg-[#1E3A8A] hover:text-white transition-colors"
                      >
                        Inspect Spec Table ({p.tab}) ↓
                      </button>
                      <Link to={`/contact?product=${encodeURIComponent(p.name)}`} className="w-full sm:w-auto text-center text-xs font-bold bg-slate-100 text-slate-700 rounded-lg px-4 py-2.5 hover:bg-slate-200 transition-colors">
                        Request Factory Quote
                      </Link>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200">
                    <h4 className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mb-2.5">Technical Highlights</h4>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {p.details.map(d => (
                        <li key={d} className="flex items-start gap-2 text-xs text-slate-600">
                          <span className="w-3.5 h-3.5 rounded-full bg-yellow-100 text-[#F59E0B] flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">✓</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SECTION: Interactive Specification Tables */}
      <section id="spec-table" className="py-12 sm:py-16 px-4 sm:px-6 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F59E0B] mb-1 sm:mb-2">Dimensional Engineering Matrices</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E3A8A]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                Technical Specification Table
              </h2>
            </div>
            {/* Quick Search */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search code (e.g. TM-08, PU06)…"
                className="text-xs px-3.5 py-2 rounded-lg border border-slate-300 outline-none focus:border-[#1E3A8A] bg-white font-mono w-full sm:w-64"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-xs text-slate-400 hover:text-slate-600 shrink-0">✕ Clear</button>
              )}
            </div>
          </div>

          {/* Series Tabs */}
          <div className="flex gap-2 pb-3 mb-4 overflow-x-auto no-scrollbar sm:flex-wrap">
            {SPEC_TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0 ${
                  activeTab === tab
                    ? 'bg-[#1E3A8A] text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Mobile scroll hint */}
          <div className="text-[11px] text-slate-400 italic mb-2 md:hidden flex items-center gap-1.5">
            <span>⇄</span> Scroll table horizontally to view full dimensions and pressures
          </div>

          {/* Spec Table */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden mb-6">
            {activeTab === 'PU Tubing' && (
              <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-bold text-amber-900 flex items-center gap-1.5">
                  <span>📄</span> PROMAX PU (Polyurethane) Tubing — Price List 10-07-2024
                </span>
                <span className="text-amber-800 text-[11px] font-medium">Standard Coil Length: 100 Meters | Shore 98A</span>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse min-w-[760px]">
                <thead className="bg-[#1E3A8A] text-white uppercase text-[10px] sm:text-[11px] font-mono">
                  <tr>
                    <th className="p-3 sm:p-3.5">Code</th>
                    <th className="p-3 sm:p-3.5">OD (mm)</th>
                    <th className="p-3 sm:p-3.5">ID (mm)</th>
                    {activeTab === 'PU Tubing' && (
                      <>
                        <th className="p-3 sm:p-3.5">Tolerance</th>
                        <th className="p-3 sm:p-3.5">Std Length</th>
                        <th className="p-3 sm:p-3.5 text-emerald-300">Unit Price / Roll</th>
                        <th className="p-3 sm:p-3.5 text-amber-300">Unit Price / M</th>
                      </>
                    )}
                    <th className="p-3 sm:p-3.5">Working Press.</th>
                    <th className="p-3 sm:p-3.5">Burst Press.</th>
                    <th className="p-3 sm:p-3.5">Min Bend</th>
                    <th className="p-3 sm:p-3.5 text-right">RFQ Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rows.length === 0 ? (
                    <tr>
                      <td colSpan={activeTab === 'PU Tubing' ? 11 : 7} className="p-8 text-center text-slate-400">No specifications matched code query.</td>
                    </tr>
                  ) : (
                    rows.map(r => (
                      <tr key={r.code} className="hover:bg-blue-50/60 transition-colors">
                        <td className="p-3 sm:p-3.5 font-bold font-mono text-[#1E3A8A]">{r.code}</td>
                        <td className="p-3 sm:p-3.5 font-mono">{r.od_mm}</td>
                        <td className="p-3 sm:p-3.5 font-mono font-semibold">{r.id_mm}</td>
                        {activeTab === 'PU Tubing' && (
                          <>
                            <td className="p-3 sm:p-3.5 font-mono text-slate-600">±{r.tolerance || '0.10'}</td>
                            <td className="p-3 sm:p-3.5 font-mono text-slate-600">100m</td>
                            <td className="p-3 sm:p-3.5 font-mono font-bold text-emerald-700">{r.priceRoll || '—'}</td>
                            <td className="p-3 sm:p-3.5 font-mono font-bold text-amber-700">{r.priceMeter || '—'}</td>
                          </>
                        )}
                        <td className="p-3 sm:p-3.5 font-mono font-semibold text-emerald-700">{r.wp_bar} Bar ({r.wp_psi} PSI)</td>
                        <td className="p-3 sm:p-3.5 font-mono text-slate-700">{r.bp_bar} Bar ({r.bp_psi} PSI)</td>
                        <td className="p-3 sm:p-3.5 font-mono">{r.bend_mm} mm</td>
                        <td className="p-3 sm:p-3.5 text-right">
                          <Link
                            to={`/contact?product=${r.code}%20(${r.od_mm}x${r.id_mm}mm,%20${r.priceRoll ? `Roll:%20${r.priceRoll}` : `WP:%20${r.wp_bar}Bar`})`}
                            className="inline-block px-2.5 sm:px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded font-bold text-[10px] sm:text-[11px] transition-colors whitespace-nowrap"
                          >
                            RFQ This Spec →
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* PROMAX RE-COIL HOSE Table (Shown when PU Tubing is Active) */}
          {activeTab === 'PU Tubing' && (
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden mb-6">
              <div className="bg-[#1E3A8A] text-white px-4 py-3 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                    PROMAX RE - COIL HOSE
                  </h3>
                  <div className="text-[11px] text-blue-200">Extended working lengths with male spring guards & quick fittings</div>
                </div>
                <span className="text-[10px] font-mono uppercase bg-[#F59E0B] text-slate-900 px-2 py-0.5 rounded font-bold">
                  Price List 10-07-2024
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse min-w-[560px]">
                  <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] font-mono">
                    <tr>
                      <th className="p-3">Code</th>
                      <th className="p-3">Size (OD×ID)</th>
                      <th className="p-3 font-bold text-[#1E3A8A]">3 Meter (Rs)</th>
                      <th className="p-3 font-bold text-[#1E3A8A]">5 Meter (Rs)</th>
                      <th className="p-3 font-bold text-[#1E3A8A]">10 Meter (Rs)</th>
                      <th className="p-3 font-bold text-[#1E3A8A]">15 Meter (Rs)</th>
                      <th className="p-3 text-right">Inquiry</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {PROMAX_RECOIL_DATA.map(rc => (
                      <tr key={rc.code} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-bold font-mono text-[#1E3A8A]">{rc.code}</td>
                        <td className="p-3 font-mono">{rc.size}</td>
                        <td className="p-3 font-mono font-bold text-slate-800">{rc.p3m}</td>
                        <td className="p-3 font-mono font-bold text-slate-800">{rc.p5m}</td>
                        <td className="p-3 font-mono font-bold text-slate-800">{rc.p10m}</td>
                        <td className="p-3 font-mono font-bold text-emerald-700">{rc.p15m}</td>
                        <td className="p-3 text-right">
                          <Link
                            to={`/contact?product=${rc.code}%20Re-Coil%20Hose%20(${rc.size})`}
                            className="inline-block px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded font-bold text-[10px] transition-colors"
                          >
                            Order Recoil →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Terms and Conditions from PROMAX Price List */}
              <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Terms and Condition:</h4>
                <ol className="list-decimal list-inside space-y-1 text-xs text-slate-600">
                  <li><strong>GST as applicable @ 18%</strong> would be charged extra.</li>
                  <li>Prices are subject to change without prior notice and rates prevailing on delivery date shall be charged.</li>
                  <li>This cancels all our previous Price Lists.</li>
                  <li>All disputes are subject to <strong>Delhi Jurisdiction</strong>.</li>
                </ol>
              </div>
            </div>
          )}

          {/* Mechanical Specs strip */}
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 text-center">
            <div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 font-semibold uppercase">Tensile (Lining)</div>
              <div className="text-xs sm:text-sm font-bold font-mono text-slate-800 mt-0.5 sm:mt-1">{mech.tensile_lin}</div>
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 font-semibold uppercase">Tensile (Cover)</div>
              <div className="text-xs sm:text-sm font-bold font-mono text-slate-800 mt-0.5 sm:mt-1">{mech.tensile_cov}</div>
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 font-semibold uppercase">Elongation (Lining)</div>
              <div className="text-xs sm:text-sm font-bold font-mono text-slate-800 mt-0.5 sm:mt-1">{mech.elong_lin}</div>
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 font-semibold uppercase">Elongation (Cover)</div>
              <div className="text-xs sm:text-sm font-bold font-mono text-slate-800 mt-0.5 sm:mt-1">{mech.elong_cov}</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-[10px] sm:text-[11px] text-slate-400 font-semibold uppercase">Adhesion Strength</div>
              <div className="text-xs sm:text-sm font-bold font-mono text-emerald-700 mt-0.5 sm:mt-1">{mech.adhesion}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Industrial Applications Gateway Banner */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto">
          <div className="p-6 sm:p-8 bg-gradient-to-r from-[#0F243E] via-[#1E3A8A] to-[#1E3A8A] rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div>
              <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F59E0B] mb-1.5">
                Core Industry Capabilities
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold mb-2" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                Serving 8 Major Industrial Sectors Across India
              </h3>
              <p className="text-blue-200 text-xs sm:text-sm max-w-2xl leading-relaxed">
                From automotive assembly robots and pneumatic automation to heavy civil tunneling and food-grade fluid lines—view our comprehensive sector equipment case studies and photography on the Company Overview page.
              </p>
            </div>
            <Link
              to="/#applications"
              className="w-full md:w-auto shrink-0 text-center px-6 py-3 bg-[#F59E0B] hover:bg-amber-400 text-slate-900 font-bold rounded-lg text-xs transition-colors shadow-md"
            >
              Explore 8 Industrial Sectors with Pictures →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. SECTION: Quality, Indian Standards & In-House Testing Lab */}
      <section id="quality-section" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F59E0B] mb-2">Quality & Certifications</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E3A8A]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Certified. In-House Tested. Zero Defect.
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-2xl mx-auto mt-2">
              Every production batch undergoes mandatory hydrostatic pressure, elongation, flame retardancy, and adhesion testing at our Noida testing laboratory.
            </p>
          </div>

          {/* Badges Strip */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
            {['BIS / ISI Certified', 'CML No. 8700036611', 'IS 447 Approved', 'IS 12585:1988 Stamped', 'ISO 8033 Adhesion Tested', 'In-House Testing Rig'].map(b => (
              <span key={b} className="bg-white border border-slate-200 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold text-[#1E3A8A] shadow-sm flex items-center gap-1.5">
                <span className="text-[#F59E0B]">✓</span> {b}
              </span>
            ))}
          </div>

          {/* BIS Certification Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12 sm:mb-16">
            {CERTS.map(c => (
              <div key={c.code} className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white">
                <div className="p-5 sm:p-6 text-white flex items-center justify-between" style={{ background: c.color }}>
                  <div>
                    <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-amber-300 block">{c.cml}</span>
                    <h3 className="text-xl sm:text-2xl font-extrabold mt-0.5" style={{ fontFamily: 'Plus Jakarta Sans' }}>{c.code}</h3>
                    <div className="text-xs opacity-90">{c.title}</div>
                  </div>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/10 border border-white/20 flex flex-col items-center justify-center font-mono text-center shrink-0">
                    <span className="text-xs font-bold">{c.badge}</span>
                    <span className="text-[7px] sm:text-[8px] text-white/60">BIS LICENSED</span>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{c.scope}</p>
                  <div className="text-[10px] sm:text-[11px] font-bold uppercase text-slate-400 tracking-wider mb-2">Mandatory Compliance Parameters:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {c.requirements.map(req => (
                      <div key={req} className="text-xs text-slate-700 flex items-start gap-1.5 bg-slate-50 p-2 rounded border border-slate-100">
                        <span className="text-[#1E3A8A] font-bold">▪</span> <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 8 In-House Quality Tests */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-sm">
            <h3 className="text-lg sm:text-xl font-bold text-[#1E3A8A] mb-4 sm:mb-6 flex items-center gap-2" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              <span>🔬 8 In-House Laboratory Batch Tests</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {TESTS.map(t => (
                <div key={t.name} className="p-3.5 sm:p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-[#1E3A8A] mb-1">{t.name}</div>
                  <div className="text-[10px] font-mono text-[#F59E0B] font-semibold mb-1.5">{t.std}</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Bottom Inquiry CTA */}
      <section className="py-12 sm:py-14 px-4 sm:px-6 bg-[#1E3A8A] text-white">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-1" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Need Custom Tolerances or Specialized Colors?
            </h3>
            <p className="text-blue-200 text-xs sm:text-sm">
              Our engineering team compounds custom thermoplastic alloys for chemical resistance and high burst pressures.
            </p>
          </div>
          <Link
            to="/contact"
            className="w-full sm:w-auto text-center shrink-0 px-6 py-3 bg-[#F59E0B] hover:bg-amber-400 text-slate-900 font-bold rounded-lg text-xs transition-colors shadow-md"
          >
            Submit Custom Specification RFQ →
          </Link>
        </div>
      </section>
    </div>
  )
}
