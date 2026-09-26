import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router';
import { api, RfqItem } from '../services/api';

export default function RfqTracker() {
  const location = useLocation();
  const [trackingId, setTrackingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rfq, setRfq] = useState<RfqItem | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id) {
      setTrackingId(id);
      fetchRfq(id);
    }
  }, [location.search]);

  const fetchRfq = async (idToFetch: string) => {
    if (!idToFetch.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.getRfqById(idToFetch.trim());
      setRfq(res.data);
    } catch (err: any) {
      setRfq(null);
      setError(err.message || 'Quotation tracking record not found. Please check your reference code.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRfq(trackingId);
  };

  const getStatusBadge = (status: RfqItem['status']) => {
    switch (status) {
      case 'received':
        return <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider">Received</span>;
      case 'engineering_review':
        return <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase tracking-wider">Engineering Review</span>;
      case 'quote_prepared':
        return <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider">Quotation Ready</span>;
      case 'approved':
        return <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold uppercase tracking-wider">Order Approved</span>;
      case 'dispatched':
        return <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold uppercase tracking-wider">Dispatched from Factory</span>;
      case 'rejected':
        return <span className="px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-xs font-bold uppercase tracking-wider">Closed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Banner */}
      <section className="bg-[#0F243E] text-white py-14 px-6 border-b border-slate-700">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#F59E0B] mb-2">Live Factory Desk</div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">RFQ & Quotation Tracker</h1>
          <p className="text-slate-300 mt-2 max-w-2xl text-sm md:text-base">
            Track your industrial hose RFQ in real-time. Follow engineering feasibility assessments, compound checks, and commercial pricing updates direct from our Noida works.
          </p>
        </div>
      </section>

      {/* Tracker Search Box */}
      <div className="max-w-4xl mx-auto px-6 -mt-7">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter RFQ ID (e.g. RFQ-2026-8812)"
                className="w-full pl-4 pr-10 py-3 rounded-lg border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] font-mono text-sm uppercase"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#1E3A8A] hover:bg-[#152e6e] text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm shadow-sm disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Track RFQ Status →'}
            </button>
          </form>

          {/* Quick Demo Fillers */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-600">Sample Live RFQs:</span>
            {['RFQ-2026-8812', 'RFQ-2026-8945', 'RFQ-2026-9020'].map((sampleId) => (
              <button
                key={sampleId}
                type="button"
                onClick={() => {
                  setTrackingId(sampleId);
                  fetchRfq(sampleId);
                }}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded border border-slate-200 font-mono transition-colors"
              >
                {sampleId}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-4xl mx-auto px-6 mt-8">
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-5 rounded-xl text-sm flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="font-bold">Tracking Record Not Found</p>
              <p className="mt-0.5 text-xs text-rose-700">{error}</p>
            </div>
          </div>
        )}

        {rfq && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Top Bar */}
            <div className="bg-slate-900 text-white p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-400 font-mono">REFERENCE IDENTIFIER</div>
                <div className="text-2xl font-black font-mono tracking-wide text-[#F59E0B]">{rfq.id}</div>
                <div className="text-xs text-slate-400 mt-1">Submitted: {new Date(rfq.createdAt).toLocaleString()}</div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-xs text-slate-400 mb-1">Current Status</div>
                {getStatusBadge(rfq.status)}
              </div>
            </div>

            {/* Details Grid */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-slate-100 bg-slate-50/50">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Client Details</h4>
                <div className="text-sm font-bold text-slate-800">{rfq.name}</div>
                <div className="text-sm text-slate-600 font-medium">{rfq.company}</div>
                <div className="text-xs text-slate-500 mt-1">Email: {rfq.email} | Mobile: {rfq.phone}</div>
                {rfq.deliveryLocation && (
                  <div className="text-xs text-slate-500 mt-0.5">Destination: {rfq.deliveryLocation}</div>
                )}
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Technical Specification</h4>
                <div className="text-sm font-semibold text-[#1E3A8A]">{rfq.productCategory}</div>
                <div className="text-xs font-mono bg-white p-2.5 rounded-lg border border-slate-200 mt-1.5 text-slate-700 leading-relaxed">
                  {rfq.requiredQty}
                </div>
              </div>
            </div>

            {/* Commercial Quote / Engineering Review Box */}
            {(rfq.quotedAmount || rfq.assignedEngineer || rfq.engineerRemarks) && (
              <div className="p-6 bg-amber-50/60 border-b border-amber-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-amber-600 font-bold">⚙️ Factory Desk Assessment</span>
                  {rfq.assignedEngineer && (
                    <span className="text-xs bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded">
                      Assigned: {rfq.assignedEngineer}
                    </span>
                  )}
                </div>

                {rfq.engineerRemarks && (
                  <p className="text-xs text-slate-700 leading-relaxed mb-3 italic bg-white p-3 rounded-lg border border-amber-200">
                    "{rfq.engineerRemarks}"
                  </p>
                )}

                {rfq.quotedAmount && (
                  <div className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-emerald-300">
                    <div>
                      <div className="text-xs font-semibold text-slate-500">Commercial Quote Value</div>
                      <div className="text-xl font-black text-emerald-700 font-mono">{rfq.quotedAmount}</div>
                    </div>
                    <a
                      href="tel:+918800732441"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors"
                    >
                      Confirm Order with Works Desk →
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Timeline Milestones */}
            <div className="p-6">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 flex items-center gap-2">
                <span>Timeline & Factory Milestones</span>
                <span className="text-xs font-normal text-slate-500 lowercase">({rfq.timeline.length} updates logged)</span>
              </h4>

              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-200">
                {rfq.timeline.map((evt, idx) => (
                  <div key={idx} className="relative flex items-start gap-4 pl-8">
                    <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-[#1E3A8A] ring-4 ring-blue-100" />
                    <div className="flex-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="font-bold text-sm text-slate-900">{evt.title}</span>
                        <span className="text-xs text-slate-400 font-mono">{new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(evt.timestamp).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{evt.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer actions */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <Link to="/contact" className="text-xs text-[#1E3A8A] font-bold hover:underline">
                ← Submit Another Technical RFQ
              </Link>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Print Summary
                </button>
                <a
                  href={`mailto:skindustrynoida@gmail.com?subject=Inquiry on RFQ ${rfq.id}`}
                  className="px-3 py-1.5 bg-[#F59E0B] text-white rounded text-xs font-bold hover:bg-amber-600"
                >
                  Email Sales Desk
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
