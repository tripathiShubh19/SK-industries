import { useState, useEffect } from 'react';
import { api, RfqItem, DashboardStats, RfqStatus } from '../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [rfqs, setRfqs] = useState<RfqItem[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [selectedRfq, setSelectedRfq] = useState<RfqItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [updateMsg, setUpdateMsg] = useState('');

  // Status edit form
  const [newStatus, setNewStatus] = useState<RfqStatus>('engineering_review');
  const [remarks, setRemarks] = useState('');
  const [quotePrice, setQuotePrice] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, rfqsRes] = await Promise.all([
        api.getStats(),
        api.getAllRfqs({ status: filterStatus || undefined, search: search || undefined })
      ]);
      setStats(statsRes.data);
      setRfqs(rfqsRes.data);
      if (rfqsRes.data.length > 0 && !selectedRfq) {
        setSelectedRfq(rfqsRes.data[0]);
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filterStatus]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRfq) return;
    setIsUpdating(true);
    setUpdateMsg('');

    try {
      const res = await api.updateRfqStatus(selectedRfq.id, {
        status: newStatus,
        engineerRemarks: remarks || undefined,
        quotedAmount: quotePrice || undefined
      });

      setUpdateMsg(`Quotation ${selectedRfq.id} updated successfully!`);
      setSelectedRfq(res.data);
      setRemarks('');
      setQuotePrice('');
      // Reload stats and table
      const [statsRes, rfqsRes] = await Promise.all([
        api.getStats(),
        api.getAllRfqs({ status: filterStatus || undefined, search: search || undefined })
      ]);
      setStats(statsRes.data);
      setRfqs(rfqsRes.data);
    } catch (err: any) {
      alert(err.message || 'Failed to update quotation');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 gap-4 border-b border-slate-300">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-slate-500">Factory Management Portal</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F243E] mt-1">RFQ & Industrial Orders Console</h1>
            <p className="text-slate-600 text-sm mt-0.5">Manage live buyer specifications, calculate quotations, and push factory milestones.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm flex items-center gap-2"
            >
              🔄 Refresh Data
            </button>
            <span className="px-3 py-1.5 bg-[#1E3A8A] text-white rounded-lg text-xs font-bold font-mono">
              Port: 5001 (Active)
            </span>
          </div>
        </div>

        {/* KPI Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total RFQs Received</div>
              <div className="text-3xl font-extrabold text-[#1E3A8A] mt-2 font-mono">{stats.totalRfqs}</div>
              <div className="text-xs text-slate-400 mt-1">Across all hose series</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Awaiting Engineering</div>
              <div className="text-3xl font-extrabold text-amber-600 mt-2 font-mono">{stats.pendingReview}</div>
              <div className="text-xs text-slate-400 mt-1">Target turnaround: &lt; 24h</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Quotes Released</div>
              <div className="text-3xl font-extrabold text-emerald-600 mt-2 font-mono">{stats.quotesPrepared}</div>
              <div className="text-xs text-slate-400 mt-1">Commercial terms sent</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Dispatched / Confirmed</div>
              <div className="text-3xl font-extrabold text-indigo-600 mt-2 font-mono">{stats.approvedOrders}</div>
              <div className="text-xs text-slate-400 mt-1">Works batch complete</div>
            </div>
          </div>
        )}

        {/* Main Grid: RFQ List & Detailed Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Table / List */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            {/* Filter and search bar */}
            <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex flex-wrap gap-3 items-center justify-between">
              <form onSubmit={handleSearchSubmit} className="flex-1 min-w-[200px]">
                <input
                  type="text"
                  placeholder="Filter by company, ID, or product..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-[#1E3A8A]"
                />
              </form>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white outline-none"
              >
                <option value="">All Statuses</option>
                <option value="received">Received</option>
                <option value="engineering_review">Engineering Review</option>
                <option value="quote_prepared">Quote Prepared</option>
                <option value="approved">Approved</option>
                <option value="dispatched">Dispatched</option>
              </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto flex-1 max-h-[600px] overflow-y-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-600 uppercase font-bold sticky top-0">
                  <tr>
                    <th className="p-3">RFQ ID</th>
                    <th className="p-3">Buyer & Company</th>
                    <th className="p-3">Product Category</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-500">Loading incoming factory inquiries...</td>
                    </tr>
                  ) : rfqs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-500">No RFQs matching selected filter.</td>
                    </tr>
                  ) : (
                    rfqs.map((r) => {
                      const isSelected = selectedRfq?.id === r.id;
                      return (
                        <tr
                          key={r.id}
                          onClick={() => setSelectedRfq(r)}
                          className={`cursor-pointer transition-colors ${isSelected ? 'bg-blue-50/80 font-medium' : 'hover:bg-slate-50'}`}
                        >
                          <td className="p-3 font-mono font-bold text-[#1E3A8A]">{r.id}</td>
                          <td className="p-3">
                            <div className="font-semibold text-slate-800">{r.name}</div>
                            <div className="text-slate-500 text-[11px]">{r.company}</div>
                          </td>
                          <td className="p-3 text-slate-600 max-w-[160px] truncate">{r.productCategory}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              r.status === 'received' ? 'bg-amber-100 text-amber-800' :
                              r.status === 'engineering_review' ? 'bg-blue-100 text-blue-800' :
                              r.status === 'quote_prepared' ? 'bg-emerald-100 text-emerald-800' :
                              r.status === 'dispatched' ? 'bg-purple-100 text-purple-800' :
                              'bg-slate-100 text-slate-700'
                            }`}>
                              {r.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="p-3 text-right font-mono text-[11px] text-slate-400">
                            {new Date(r.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Selected RFQ Details & Status Update Form */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
            {selectedRfq ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase">Selected RFQ Record</span>
                    <h3 className="text-xl font-black font-mono text-[#1E3A8A]">{selectedRfq.id}</h3>
                  </div>
                  <span className="text-xs bg-slate-100 text-slate-600 font-mono px-2.5 py-1 rounded">
                    {new Date(selectedRfq.createdAt).toLocaleString()}
                  </span>
                </div>

                {/* Buyer specs */}
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div>
                      <span className="text-slate-400 block font-semibold">Buyer Name</span>
                      <span className="font-bold text-slate-800">{selectedRfq.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">Company</span>
                      <span className="font-bold text-slate-800">{selectedRfq.company}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">Email</span>
                      <span className="text-slate-700">{selectedRfq.email}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">Phone</span>
                      <span className="text-slate-700">{selectedRfq.phone}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50/60 p-3 rounded-lg border border-blue-100">
                    <span className="text-blue-900 block font-bold mb-1">Requested Product & Specs</span>
                    <p className="font-mono text-[11px] text-slate-800 whitespace-pre-wrap">{selectedRfq.requiredQty}</p>
                    {selectedRfq.deliveryLocation && (
                      <p className="text-[11px] text-slate-600 mt-2">📍 Destination: {selectedRfq.deliveryLocation}</p>
                    )}
                  </div>
                </div>

                {/* Status Update Form */}
                <form onSubmit={handleUpdateStatus} className="border-t border-slate-200 pt-5 space-y-4">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Engineer Action & Milestones
                  </h4>

                  {updateMsg && (
                    <div className="p-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-xs">
                      {updateMsg}
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Update Status State</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as RfqStatus)}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white outline-none focus:border-[#1E3A8A]"
                    >
                      <option value="engineering_review">Engineering Review</option>
                      <option value="quote_prepared">Commercial Quote Prepared</option>
                      <option value="approved">Purchase Order Approved</option>
                      <option value="dispatched">Dispatched from Noida Works</option>
                      <option value="rejected">Rejected / Non-Feasible</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Commercial Quoted Amount (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹ 2,45,000 + GST"
                      value={quotePrice}
                      onChange={(e) => setQuotePrice(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-lg outline-none focus:border-[#1E3A8A] font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Engineering Remarks / Dispatch Notes</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Batch extrusion scheduled for Monday. Pressure testing passed at 60 Bar."
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-lg outline-none focus:border-[#1E3A8A] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="w-full py-2.5 bg-[#1E3A8A] hover:bg-[#162c69] text-white font-bold text-xs rounded-lg transition-colors shadow-sm disabled:opacity-50"
                  >
                    {isUpdating ? 'Saving Update...' : 'Commit Status Update →'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-16 text-slate-400 text-sm">
                Select an RFQ from the table to view details and issue updates.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
