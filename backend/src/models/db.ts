import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { RfqItem, ContactMessage, DashboardStats } from './types.js';
import { PRODUCTS_CATALOG } from '../data/products.data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.resolve(__dirname, '../../data/store.json');

// Initial seed RFQs for demonstration
const INITIAL_RFQS: RfqItem[] = [
  {
    id: 'RFQ-2026-8812',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    name: 'Rajesh Varma',
    company: 'Tata Motors Ancillary Division',
    email: 'rajesh.varma@tataancillary.com',
    phone: '+91 98230 44910',
    productCategory: 'Thermoplastic Multipurpose Hose (TM Series)',
    requiredQty: 'TM-08, 10mm ID, WP 20 Bar — 1,500 meters in 100m reels',
    deliveryLocation: 'Pune Plant, Maharashtra',
    notes: 'Require mill test certificate (MTC) and IS 447 batch conformance reports with dispatch.',
    status: 'quote_prepared',
    estimatedQuoteTurnaround: 'Within 24 Hours',
    quotedAmount: '₹ 1,87,500 + GST',
    assignedEngineer: 'Er. Vikrant Sharma (Sr. Polymer Engineer)',
    engineerRemarks: 'Recommended TM-08 with oil-resistant blue cover. MTC and burst pressure test logs ready for dispatch attachment.',
    timeline: [
      {
        status: 'received',
        title: 'RFQ Received at Factory Desk',
        description: 'Specification logged and assigned to technical engineering desk.',
        timestamp: new Date(Date.now() - 3600000 * 18).toISOString()
      },
      {
        status: 'engineering_review',
        title: 'Technical Feasibility Approved',
        description: 'Compound formulation and burst pressure verified against IS 447 Class 2.',
        timestamp: new Date(Date.now() - 3600000 * 10).toISOString()
      },
      {
        status: 'quote_prepared',
        title: 'Commercial Quotation Released',
        description: 'Factory-direct discounted quote generated with 5-day dispatch commitment.',
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString()
      }
    ]
  },
  {
    id: 'RFQ-2026-8945',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    name: 'Ananya Deshmukh',
    company: 'Godrej Process Solutions',
    email: 'ananya.d@godrej-proc.com',
    phone: '+91 98110 99231',
    productCategory: 'PU Tubing & Recoil Coils (PU Series)',
    requiredQty: 'PU06 (8x5.5mm) High-Flex Blue — 4,000 meters + 50 Recoil Assemblies (10m working)',
    deliveryLocation: 'Vikhroli, Mumbai',
    notes: 'For automated pick-and-place gantry systems. Requires tight tolerance (+/- 0.05mm).',
    status: 'engineering_review',
    estimatedQuoteTurnaround: 'Within 4 Hours',
    assignedEngineer: 'Er. Amit Verma',
    engineerRemarks: 'Batch extrusion schedule checked. Ether-grade TPU material allocated.',
    timeline: [
      {
        status: 'received',
        title: 'RFQ Received at Factory Desk',
        description: 'Technical requirements submitted via web portal.',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
      },
      {
        status: 'engineering_review',
        title: 'Under Engineering Review',
        description: 'Checking raw polymer inventory and coil manufacturing schedule.',
        timestamp: new Date(Date.now() - 3600000 * 1).toISOString()
      }
    ]
  },
  {
    id: 'RFQ-2026-9020',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    name: 'Sunil Mehta',
    company: 'L&T Heavy Engineering',
    email: 's.mehta@larsentoubro.com',
    phone: '+91 97234 11098',
    productCategory: 'Air / Water Hose (AW Series)',
    requiredQty: 'AW-25 (1" ID) 10 Bar WP — 800 meters',
    deliveryLocation: 'Hazira Works, Surat, Gujarat',
    notes: 'For quarry utility compressor lines.',
    status: 'dispatched',
    estimatedQuoteTurnaround: 'Completed',
    quotedAmount: '₹ 1,44,000 + GST',
    assignedEngineer: 'Er. Sandeep Rawat',
    engineerRemarks: 'Dispatched via V-Trans Logistics. LR No: VT-2026-9812.',
    timeline: [
      {
        status: 'received',
        title: 'RFQ Received',
        description: 'Customer inquiry captured.',
        timestamp: new Date(Date.now() - 3600000 * 48).toISOString()
      },
      {
        status: 'quote_prepared',
        title: 'Quotation Approved',
        description: 'Purchase Order PO-7892 received and approved.',
        timestamp: new Date(Date.now() - 3600000 * 36).toISOString()
      },
      {
        status: 'dispatched',
        title: 'Dispatched from Noida Works',
        description: 'Dispatched via V-Trans Logistics with test certificate.',
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString()
      }
    ]
  }
];

const INITIAL_CONTACTS: ContactMessage[] = [
  {
    id: 'MSG-101',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    name: 'Karan Singhal',
    company: 'Precision Hydraulics & Seals',
    email: 'karan@precisionhyd.in',
    phone: '+91 99100 88219',
    subject: 'Authorized Dealership for Western Region',
    message: 'We are a major industrial distributor in Pune & Aurangabad. Interested in stocking SK Polychem TM and PU lines.',
    status: 'new'
  }
];

class Database {
  private rfqs: RfqItem[] = [];
  private contacts: ContactMessage[] = [];

  constructor() {
    this.load();
  }

  private load(): void {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const data = JSON.parse(raw);
        this.rfqs = data.rfqs || INITIAL_RFQS;
        this.contacts = data.contacts || INITIAL_CONTACTS;
      } else {
        this.rfqs = [...INITIAL_RFQS];
        this.contacts = [...INITIAL_CONTACTS];
        this.save();
      }
    } catch {
      this.rfqs = [...INITIAL_RFQS];
      this.contacts = [...INITIAL_CONTACTS];
    }
  }

  private save(): void {
    try {
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify({ rfqs: this.rfqs, contacts: this.contacts }, null, 2));
    } catch (err) {
      console.error('Failed to persist database file:', err);
    }
  }

  // RFQ Methods
  public getRfqs(): RfqItem[] {
    return [...this.rfqs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getRfqById(id: string): RfqItem | undefined {
    return this.rfqs.find(r => r.id.toLowerCase() === id.trim().toLowerCase());
  }

  public addRfq(data: Omit<RfqItem, 'id' | 'createdAt' | 'updatedAt' | 'timeline' | 'status' | 'estimatedQuoteTurnaround'>): RfqItem {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newId = `RFQ-2026-${randomDigits}`;
    const now = new Date().toISOString();

    const newRfq: RfqItem = {
      ...data,
      id: newId,
      createdAt: now,
      updatedAt: now,
      status: 'received',
      estimatedQuoteTurnaround: 'Within 24 Hours',
      timeline: [
        {
          status: 'received',
          title: 'RFQ Registered at Noida Works',
          description: 'Specification queued for immediate technical and pricing assessment.',
          timestamp: now
        }
      ]
    };

    this.rfqs.unshift(newRfq);
    this.save();
    return newRfq;
  }

  public updateRfqStatus(id: string, status: RfqItem['status'], remarks?: string, quotedAmount?: string): RfqItem | null {
    const rfq = this.getRfqById(id);
    if (!rfq) return null;

    rfq.status = status;
    rfq.updatedAt = new Date().toISOString();
    if (remarks) rfq.engineerRemarks = remarks;
    if (quotedAmount) rfq.quotedAmount = quotedAmount;

    const titles: Record<RfqItem['status'], string> = {
      received: 'RFQ Logged',
      engineering_review: 'Under Engineering Review',
      quote_prepared: 'Commercial Quotation Ready',
      approved: 'Order Confirmed for Production',
      rejected: 'Technical Non-feasibility / Closed',
      dispatched: 'Dispatched from Factory'
    };

    rfq.timeline.push({
      status,
      title: titles[status] || 'Status Updated',
      description: remarks || `Status transitioned to ${status.replace('_', ' ').toUpperCase()}`,
      timestamp: rfq.updatedAt
    });

    this.save();
    return rfq;
  }

  // Contact Methods
  public getContacts(): ContactMessage[] {
    return [...this.contacts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public addContact(data: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage {
    const id = `MSG-${Math.floor(100 + Math.random() * 900)}`;
    const newMsg: ContactMessage = {
      ...data,
      id,
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    this.contacts.unshift(newMsg);
    this.save();
    return newMsg;
  }

  // Dashboard Metrics
  public getStats(): DashboardStats {
    const totalRfqs = this.rfqs.length;
    const pendingReview = this.rfqs.filter(r => r.status === 'received' || r.status === 'engineering_review').length;
    const quotesPrepared = this.rfqs.filter(r => r.status === 'quote_prepared').length;
    const approvedOrders = this.rfqs.filter(r => r.status === 'approved' || r.status === 'dispatched').length;
    const totalProductsListed = PRODUCTS_CATALOG.reduce((acc, cat) => acc + cat.specs.length, 0);

    return {
      totalRfqs,
      pendingReview,
      quotesPrepared,
      approvedOrders,
      totalProductsListed,
      avgTurnaroundHours: 3.8
    };
  }
}

export const db = new Database();
