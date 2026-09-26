import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import { api, RfqItem, DashboardStats, RfqStatus } from '../services/api'

export default function Contact() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState<'rfq' | 'tracker' | 'console'>('rfq')

  // RFQ Submission Form State
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    product: '',
    qty: '',
    deliveryLocation: '',
    notes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedRfq, setSubmittedRfq] = useState<RfqItem | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // RFQ Tracker State
  const [trackingId, setTrackingId] = useState('')
  const [trackerLoading, setTrackerLoading] = useState(false)
  const [trackerError, setTrackerError] = useState<string | null>(null)
  const [trackedRfq, setTrackedRfq] = useState<RfqItem | null>(null)

  // Admin Console State
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [allRfqs, setAllRfqs] = useState<RfqItem[]>([])
  const [selectedAdminRfq, setSelectedAdminRfq] = useState<RfqItem | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('')
  const [adminSearch, setAdminSearch] = useState<string>('')
  const [newStatus, setNewStatus] = useState<RfqStatus>('engineering_review')
  const [remarks, setRemarks] = useState('')
  const [quotePrice, setQuotePrice] = useState('')
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
  const [updateSuccessMsg, setUpdateSuccessMsg] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const product = params.get('product')
    if (product) {
      setForm(f => ({ ...f, qty: product + ' — ' }))
      setActiveTab('rfq')
    }

    const tabParam = params.get('tab')
    if (tabParam === 'tracker') setActiveTab('tracker')
    if (tabParam === 'console') setActiveTab('console')

    const rfqId = params.get('id')
    if (rfqId) {
      setTrackingId(rfqId)
      setActiveTab('tracker')
      handleTrackId(rfqId)
    }

    // Load admin data when switching to console
    if (activeTab === 'console') {
      loadConsoleData()
    }
  }, [location.search, activeTab])

  // Tracker Logic
  const handleTrackId = async (id: string) => {
    if (!id.trim()) return
    setTrackerLoading(true)
    setTrackerError(null)
    try {
      const res = await api.getRfqById(id.trim())
      setTrackedRfq(res.data)
    } catch (err: any) {
      setTrackedRfq(null)
      setTrackerError(err.message || 'RFQ reference code not found in factory database.')
    } finally {
      setTrackerLoading(false)
    }
  }

  // WhatsApp Quick Lead Generator (100% Free wa.me API)
  const getWhatsAppMessage = (rfqData?: any) => {
    const f = rfqData || form
    const refCode = rfqData?.id ? `\n📌 *Reference ID:* ${rfqData.id}` : ''
    const lines = [
      `*Industrial Quotation Request — SK Polychem*`,
      `🏢 *Company:* ${f.company || 'Not specified'}`,
      `👤 *Contact:* ${f.name || 'Not specified'}`,
      `📞 *Phone:* ${f.phone || 'Not specified'}`,
      `✉️ *Email:* ${f.email || 'Not specified'}`,
      `📦 *Product:* ${f.productCategory || f.product || 'Not specified'}`,
      `⚙️ *Specs & Quantity:* ${f.requiredQty || f.qty || 'Not specified'}`,
      f.deliveryLocation ? `📍 *Destination:* ${f.deliveryLocation}` : '',
      refCode,
      `\n_Sent directly from website quote desk. Please share formal commercial quotation & MTC._`
    ].filter(Boolean).join('\n')

    return encodeURIComponent(lines)
  }

  const handleOpenWhatsApp = (rfqData?: any) => {
    const text = getWhatsAppMessage(rfqData)
    // Factory WhatsApp sales number (+91-8800732441)
    const phone = '918800732441'
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank')
  }

  // RFQ Submission Logic
  const setField = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const submitRfqForm = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const response = await api.submitRfq({
        name: form.name,
        company: form.company,
        email: form.email,
        phone: form.phone,
        productCategory: form.product || 'General / Unspecified',
        requiredQty: form.qty,
        deliveryLocation: form.deliveryLocation || undefined,
        notes: form.notes || undefined,
      })
      setSubmittedRfq(response.data)
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit RFQ to backend server.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Admin Console Logic
  const loadConsoleData = async () => {
    try {
      const [statsRes, rfqsRes] = await Promise.all([
        api.getStats(),
        api.getAllRfqs({ status: filterStatus || undefined, search: adminSearch || undefined })
      ])
      setStats(statsRes.data)
      setAllRfqs(rfqsRes.data)
      if (rfqsRes.data.length > 0 && !selectedAdminRfq) {
        setSelectedAdminRfq(rfqsRes.data[0])
      }
    } catch (err) {
      console.error('Failed to load console data:', err)
    }
  }

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAdminRfq) return
    setIsUpdatingStatus(true)
    setUpdateSuccessMsg('')

    try {
      const res = await api.updateRfqStatus(selectedAdminRfq.id, {
        status: newStatus,
        engineerRemarks: remarks || undefined,
        quotedAmount: quotePrice || undefined
      })
      setUpdateSuccessMsg(`Status for ${selectedAdminRfq.id} updated!`)
      setSelectedAdminRfq(res.data)
      setRemarks('')
      setQuotePrice('')
      loadConsoleData()
    } catch (err: any) {
      alert(err.message || 'Failed to update RFQ')
    } finally {
      setIsUpdatingStatus(false)
    }
  }

  return (
    <div className="w-full overflow-x-hidden">
      {/* 1. Header Banner */}
      <section className="bg-[#1E3A8A] text-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F59E0B] mb-2 sm:mb-3">
            Direct Factory Operations & Quotation Desk
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 leading-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            Contact & RFQ Center
          </h1>
          <p className="text-slate-300 max-w-2xl text-sm sm:text-base lg:text-lg mb-6 sm:mb-8">
            Factory-direct quotation processing, live quotation tracking, and direct access to polymer engineering specialists at Noida Works.
          </p>

          {/* Tab Switcher */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 pt-1 sm:pt-2">
            {[
              { id: 'rfq', label: '📝 Submit Technical RFQ' },
              { id: 'tracker', label: '🔍 Live RFQ Tracker' },
              { id: 'console', label: '⚙️ Factory Console (Admin)' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm text-center ${activeTab === tab.id
                    ? 'bg-[#F59E0B] text-slate-900 shadow-amber-500/20'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Main Content Area */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          {/* TAB 1: Submit Technical RFQ */}
          {activeTab === 'rfq' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left: Contact Info */}
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E3A8A] mb-4 sm:mb-6" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                  Direct Factory Contact
                </h2>
                <div className="space-y-3.5 sm:space-y-4 mb-8">
                  <a href="tel:+918800732441" className="flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-sm hover:border-[#F59E0B] transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center shrink-0">📞</div>
                    <div>
                      <div className="font-semibold text-[#1E3A8A] mb-0.5 group-hover:text-[#F59E0B] transition-colors text-xs sm:text-sm">Factory Lines</div>
                      <div className="font-bold text-[#1E3A8A] text-sm sm:text-base">+91-8800732441</div>
                      <div className="text-slate-500 text-xs">WhatsApp & Engineering Consultations</div>
                    </div>
                  </a>

                  <a href="mailto:skindustrynoida@gmail.com" className="flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-sm hover:border-[#F59E0B] transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center shrink-0">✉️</div>
                    <div>
                      <div className="font-semibold text-[#1E3A8A] mb-0.5 group-hover:text-[#F59E0B] transition-colors text-xs sm:text-sm">Sales & Tender Desk</div>
                      <div className="font-bold text-[#1E3A8A] text-sm sm:text-base">skindustrynoida@gmail.com</div>
                      <div className="text-slate-500 text-xs">Direct responses within 24 working hours</div>
                    </div>
                  </a>

                  <div className="flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center shrink-0">📍</div>
                    <div>
                      <div className="font-semibold text-[#1E3A8A] mb-0.5 text-xs sm:text-sm">Noida Works & Factory</div>
                      <div className="text-slate-700 font-medium text-xs sm:text-sm">A-109 W, Sector-80</div>
                      <div className="text-slate-500 text-xs">Noida-201305, Uttar Pradesh, India</div>
                    </div>
                  </div>

                  {/* Switch to Tracker Card */}
                  <div className="p-4 sm:p-5 bg-amber-50 border border-amber-200 rounded-xl">
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">Check Existing Quotation?</div>
                    <p className="text-xs text-slate-700 mb-3">
                      Track the current engineering feasibility stage, commercial pricing, and dispatch status with your reference ID.
                    </p>
                    <button
                      onClick={() => setActiveTab('tracker')}
                      className="w-full sm:w-auto px-4 py-2 bg-[#1E3A8A] text-white rounded-lg text-xs font-bold hover:bg-[#152960] transition-colors text-center"
                    >
                      Open Quotation Tracker →
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: Form */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-8 shadow-sm">
                {submittedRfq ? (
                  <div className="text-center py-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-700 text-xl sm:text-2xl font-bold flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      ✓
                    </div>
                    <div className="inline-block text-[11px] sm:text-xs uppercase tracking-widest font-mono font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full mb-2">
                      RFQ Successfully Registered
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#1E3A8A] mb-1">
                      Tracking ID: <span className="font-mono text-[#F59E0B]">{submittedRfq.id}</span>
                    </h3>
                    <p className="text-slate-600 text-xs mb-6 max-w-sm mx-auto">
                      Assigned to Noida Works engineering desk. Turnaround: {submittedRfq.estimatedQuoteTurnaround}.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-2.5 sm:gap-3 mb-3">
                      <button
                        onClick={() => handleOpenWhatsApp(submittedRfq)}
                        className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <span>💬</span> Send Quote on WhatsApp Now
                      </button>
                      <button
                        onClick={() => {
                          setTrackingId(submittedRfq.id)
                          handleTrackId(submittedRfq.id)
                          setActiveTab('tracker')
                        }}
                        className="w-full sm:w-auto px-4 py-2.5 bg-[#1E3A8A] text-white font-bold text-xs rounded-lg hover:bg-[#152a65]"
                      >
                        Track Status Live →
                      </button>
                      <button
                        onClick={() => setSubmittedRfq(null)}
                        className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-200"
                      >
                        Submit Another Spec
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      ✉️ Notification alert dispatched to <strong className="text-slate-700">skindustrynoida@gmail.com</strong>.
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-lg sm:text-xl font-extrabold text-[#1E3A8A] mb-1 sm:mb-2" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                      Submit Technical RFQ
                    </h2>
                    <p className="text-xs text-slate-500 mb-5 sm:mb-6">
                      Input your hose specifications, inner/outer diameters, working pressure, or quantity below.
                    </p>

                    {errorMessage && (
                      <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs">
                        ⚠️ {errorMessage}
                      </div>
                    )}

                    <form onSubmit={submitRfqForm} className="space-y-3.5 sm:space-y-4">
                      {/* Responsive Grid: 1 col on mobile, 2 col on tablet/desktop */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name *</label>
                          <input
                            required
                            value={form.name}
                            onChange={setField('name')}
                            type="text"
                            placeholder="e.g. Vikram Singhania"
                            className="w-full text-xs p-2.5 border border-slate-300 rounded-lg outline-none focus:border-[#1E3A8A]"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">Company Name *</label>
                          <input
                            required
                            value={form.company}
                            onChange={setField('company')}
                            type="text"
                            placeholder="e.g. Apex Industrial Systems"
                            className="w-full text-xs p-2.5 border border-slate-300 rounded-lg outline-none focus:border-[#1E3A8A]"
                          />
                        </div>
                      </div>

                      {/* Responsive Grid: 1 col on mobile, 2 col on tablet/desktop */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address *</label>
                          <input
                            required
                            value={form.email}
                            onChange={setField('email')}
                            type="email"
                            placeholder="procurement@company.com"
                            className="w-full text-xs p-2.5 border border-slate-300 rounded-lg outline-none focus:border-[#1E3A8A]"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">Mobile / WhatsApp *</label>
                          <input
                            required
                            value={form.phone}
                            onChange={setField('phone')}
                            type="tel"
                            placeholder="+91 98101 19464"
                            className="w-full text-xs p-2.5 border border-slate-300 rounded-lg outline-none focus:border-[#1E3A8A]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Product Family *</label>
                        <select
                          required
                          value={form.product}
                          onChange={setField('product')}
                          className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white outline-none focus:border-[#1E3A8A]"
                        >
                          <option value="">— Select Product Line —</option>
                          <option value="PROMAX PU Tubing (AMPU Series - Price List 2024)">PROMAX PU Tubing (AMPU Series - Price List 2024)</option>
                          <option value="PROMAX Re-Coil Hose (PUC Series 3m-15m)">PROMAX Re-Coil Hose (PUC Series 3m-15m)</option>
                          <option value="Thermoplastic Multipurpose Hose (TM Series)">Thermoplastic Multipurpose Hose (TM Series)</option>
                          <option value="Air / Water Hose (AW Series)">Air / Water Hose (AW Series)</option>
                          <option value="PVC Braided Hose (Light & Heavy Duty)">PVC Braided Hose (Light & Heavy Duty)</option>
                          <option value="Thermoplastic Welding Hose (WH Series)">Thermoplastic Welding Hose (WH Series)</option>
                          <option value="Fire Hose Reel Hose (FH Series)">Fire Hose Reel Hose (FH Series)</option>
                          <option value="Multiple / Mixed Industrial Order">Multiple / Mixed Industrial Order</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Hose Dimensions & Required Quantity *</label>
                        <textarea
                          required
                          value={form.qty}
                          onChange={setField('qty')}
                          rows={3}
                          placeholder="e.g. TM-08, 10mm ID, WP 20 Bar, qty 1,000 meters in 100m reels; MTC required."
                          className="w-full text-xs p-2.5 border border-slate-300 rounded-lg outline-none focus:border-[#1E3A8A] font-mono resize-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Delivery Destination (Optional)</label>
                        <input
                          value={form.deliveryLocation}
                          onChange={setField('deliveryLocation')}
                          type="text"
                          placeholder="e.g. Pune, Chennai, Manesar, or Export"
                          className="w-full text-xs p-2.5 border border-slate-300 rounded-lg outline-none focus:border-[#1E3A8A]"
                        />
                      </div>

                      <div className="pt-1 flex flex-col sm:flex-row gap-2.5">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 py-3 bg-[#1E3A8A] hover:bg-[#152a65] text-white font-bold text-xs rounded-lg transition-colors shadow-sm disabled:opacity-50 text-center"
                        >
                          {isSubmitting ? 'Registering RFQ...' : 'Submit & Register RFQ (Email Alert) →'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenWhatsApp()}
                          className="w-full sm:w-auto px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors shadow-sm flex items-center justify-center gap-1.5 whitespace-nowrap"
                        >
                          <span>💬</span> Instant Quote on WhatsApp
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-400 text-center sm:text-left flex items-center justify-between flex-wrap gap-2 pt-1">
                        <span>⚡ 100% Free instant quote & direct engineering review</span>
                        <span>Direct Factory: +91-8800732441</span>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Live Quotation Tracker */}
          {activeTab === 'tracker' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
                <h2 className="text-lg sm:text-xl font-extrabold text-[#1E3A8A] mb-1 sm:mb-2" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                  Live Quotation Tracker
                </h2>
                <p className="text-xs text-slate-500 mb-4">
                  Enter your RFQ reference identifier below to inspect batch allocation, technical review comments, and pricing status.
                </p>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="e.g. RFQ-2026-8812"
                    className="flex-1 text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg outline-none font-mono uppercase focus:border-[#1E3A8A]"
                  />
                  <button
                    onClick={() => handleTrackId(trackingId)}
                    disabled={trackerLoading}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#1E3A8A] text-white rounded-lg text-xs font-bold hover:bg-[#152a65] disabled:opacity-50 text-center"
                  >
                    {trackerLoading ? 'Checking...' : 'Track Quote →'}
                  </button>
                </div>

                {/* Sample IDs */}
                <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-slate-400">
                  <span className="text-[11px]">Quick Samples:</span>
                  {['RFQ-2026-8812', 'RFQ-2026-8945', 'RFQ-2026-9020'].map(sid => (
                    <button
                      key={sid}
                      onClick={() => {
                        setTrackingId(sid)
                        handleTrackId(sid)
                      }}
                      className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-mono text-[10px] sm:text-[11px]"
                    >
                      {sid}
                    </button>
                  ))}
                </div>
              </div>

              {trackerError && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800">
                  ⚠️ {trackerError}
                </div>
              )}

              {trackedRfq && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-slate-900 text-white p-5 sm:p-6 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                    <div>
                      <div className="text-[10px] text-slate-400 font-mono">REFERENCE IDENTIFIER</div>
                      <div className="text-xl sm:text-2xl font-black font-mono text-[#F59E0B]">{trackedRfq.id}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 sm:mt-1">Submitted: {new Date(trackedRfq.createdAt).toLocaleString()}</div>
                    </div>
                    <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold font-mono uppercase">
                      {trackedRfq.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 border-b border-slate-100 text-xs bg-slate-50/50">
                    <div>
                      <div className="text-slate-400 font-semibold uppercase text-[10px]">Client Details</div>
                      <div className="font-bold text-slate-800 text-xs sm:text-sm mt-0.5">{trackedRfq.name} ({trackedRfq.company})</div>
                      <div className="text-slate-500 mt-0.5">{trackedRfq.email} | {trackedRfq.phone}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-semibold uppercase text-[10px]">Specification</div>
                      <div className="font-bold text-[#1E3A8A] mt-0.5 text-xs sm:text-sm">{trackedRfq.productCategory}</div>
                      <div className="font-mono text-[11px] text-slate-600 bg-white p-2 rounded border border-slate-200 mt-1">{trackedRfq.requiredQty}</div>
                    </div>
                  </div>

                  {/* Commercial / Engineer Remarks */}
                  {(trackedRfq.quotedAmount || trackedRfq.engineerRemarks) && (
                    <div className="p-4 sm:p-6 bg-amber-50/60 border-b border-amber-100">
                      <div className="text-xs font-bold text-amber-900 mb-1">⚙️ Factory Desk Assessment</div>
                      {trackedRfq.engineerRemarks && (
                        <p className="text-xs text-slate-700 bg-white p-3 rounded-lg border border-amber-200 mb-3 italic">
                          "{trackedRfq.engineerRemarks}"
                        </p>
                      )}
                      {trackedRfq.quotedAmount && (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-3 sm:p-3.5 rounded-xl border border-emerald-300 gap-2">
                          <div>
                            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Commercial Quote</span>
                            <span className="text-base sm:text-lg font-black text-emerald-700 font-mono">{trackedRfq.quotedAmount}</span>
                          </div>
                          <span className="text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded font-bold self-start sm:self-auto">Approved for Purchase Order</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Timeline */}
                  <div className="p-4 sm:p-6">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">Milestone Timeline</h4>
                    <div className="space-y-4 relative before:absolute before:inset-0 before:left-2 before:w-0.5 before:bg-slate-200 pl-6">
                      {trackedRfq.timeline.map((evt, idx) => (
                        <div key={idx} className="relative">
                          <div className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-[#1E3A8A]" />
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs gap-0.5">
                            <span className="font-bold text-slate-800">{evt.title}</span>
                            <span className="text-slate-400 font-mono text-[10px] sm:text-[11px]">{new Date(evt.timestamp).toLocaleString()}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">{evt.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Factory Console (Admin) */}
          {activeTab === 'console' && (
            <div className="space-y-6">
              {stats && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase">Total Inquiries</div>
                    <div className="text-xl sm:text-2xl font-black text-[#1E3A8A] font-mono mt-0.5 sm:mt-1">{stats.totalRfqs}</div>
                  </div>
                  <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-[10px] sm:text-[11px] font-semibold text-amber-600 uppercase">In Review</div>
                    <div className="text-xl sm:text-2xl font-black text-amber-600 font-mono mt-0.5 sm:mt-1">{stats.pendingReview}</div>
                  </div>
                  <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-[10px] sm:text-[11px] font-semibold text-emerald-600 uppercase">Quotes Ready</div>
                    <div className="text-xl sm:text-2xl font-black text-emerald-600 font-mono mt-0.5 sm:mt-1">{stats.quotesPrepared}</div>
                  </div>
                  <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-[10px] sm:text-[11px] font-semibold text-indigo-600 uppercase">Dispatched</div>
                    <div className="text-xl sm:text-2xl font-black text-indigo-600 font-mono mt-0.5 sm:mt-1">{stats.approvedOrders}</div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* RFQ Table */}
                <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2">
                    <input
                      type="text"
                      placeholder="Filter inquiries..."
                      value={adminSearch}
                      onChange={(e) => setAdminSearch(e.target.value)}
                      onBlur={loadConsoleData}
                      className="text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg outline-none w-full sm:w-48"
                    />
                    <select
                      value={filterStatus}
                      onChange={(e) => {
                        setFilterStatus(e.target.value)
                        loadConsoleData()
                      }}
                      className="text-xs px-2 py-1.5 border border-slate-300 rounded-lg bg-white w-full sm:w-auto"
                    >
                      <option value="">All Statuses</option>
                      <option value="received">Received</option>
                      <option value="engineering_review">Engineering Review</option>
                      <option value="quote_prepared">Quote Prepared</option>
                      <option value="dispatched">Dispatched</option>
                    </select>
                  </div>

                  <div className="overflow-x-auto max-h-[450px] overflow-y-auto">
                    <table className="w-full text-xs text-left min-w-[480px]">
                      <thead className="bg-slate-100 uppercase text-[10px] text-slate-500 font-bold sticky top-0">
                        <tr>
                          <th className="p-2.5">ID</th>
                          <th className="p-2.5">Buyer</th>
                          <th className="p-2.5">Category</th>
                          <th className="p-2.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {allRfqs.map(r => (
                          <tr
                            key={r.id}
                            onClick={() => setSelectedAdminRfq(r)}
                            className={`cursor-pointer hover:bg-slate-50 ${selectedAdminRfq?.id === r.id ? 'bg-blue-50 font-semibold' : ''}`}
                          >
                            <td className="p-2.5 font-mono text-[#1E3A8A]">{r.id}</td>
                            <td className="p-2.5">{r.company}</td>
                            <td className="p-2.5 max-w-[140px] truncate">{r.productCategory}</td>
                            <td className="p-2.5 font-mono text-[10px] uppercase">{r.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Status Update Card */}
                <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm">
                  {selectedAdminRfq ? (
                    <form onSubmit={handleUpdateStatus} className="space-y-3.5 sm:space-y-4">
                      <div>
                        <div className="text-[10px] font-mono text-slate-400 uppercase">Selected Record</div>
                        <h4 className="text-base sm:text-lg font-bold font-mono text-[#1E3A8A]">{selectedAdminRfq.id}</h4>
                        <div className="text-xs text-slate-600 mt-0.5">{selectedAdminRfq.name} ({selectedAdminRfq.company})</div>
                      </div>

                      {updateSuccessMsg && (
                        <div className="p-2 bg-emerald-50 text-emerald-800 text-xs rounded border border-emerald-200">
                          {updateSuccessMsg}
                        </div>
                      )}

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Transition Status</label>
                        <select
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value as any)}
                          className="w-full text-xs p-2 border border-slate-300 rounded-lg bg-white"
                        >
                          <option value="engineering_review">Engineering Review</option>
                          <option value="quote_prepared">Quote Prepared</option>
                          <option value="approved">Purchase Order Approved</option>
                          <option value="dispatched">Dispatched from Noida Works</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Commercial Quote (₹)</label>
                        <input
                          type="text"
                          value={quotePrice}
                          onChange={(e) => setQuotePrice(e.target.value)}
                          placeholder="e.g. ₹ 1,50,000 + GST"
                          className="w-full text-xs p-2 border border-slate-300 rounded-lg font-mono"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Engineer Notes</label>
                        <textarea
                          rows={2}
                          value={remarks}
                          onChange={(e) => setRemarks(e.target.value)}
                          placeholder="e.g. Compound formula approved for IS 447."
                          className="w-full text-xs p-2 border border-slate-300 rounded-lg resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isUpdatingStatus}
                        className="w-full py-2.5 bg-[#1E3A8A] text-white rounded-lg text-xs font-bold hover:bg-[#152a65] disabled:opacity-50"
                      >
                        {isUpdatingStatus ? 'Saving...' : 'Update Quotation Status →'}
                      </button>
                    </form>
                  ) : (
                    <div className="text-center py-12 text-xs text-slate-400">
                      Select an RFQ from the table to view specs and update status.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
