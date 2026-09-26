export interface SpecRow {
  code: string;
  od_mm: string;
  od_in: string;
  id_mm: string;
  id_in: string;
  wp_bar: string;
  wp_psi: string;
  bp_bar: string;
  bp_psi: string;
  bend_mm: string;
  recommendedFittings?: string;
  standardCoilLength?: string;
  tolerance?: string;
  priceRoll?: string;
  priceMeter?: string;
}

export interface MechSpecs {
  tensile_lin: string;
  tensile_cov: string;
  elong_lin: string;
  elong_cov: string;
  adhesion: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  series: string;
  shortDesc: string;
  longDesc: string;
  standard: string;
  reinforcement: string;
  liningCover: string;
  tempRange: string;
  availableColors: string[];
  applications: string[];
  keyAdvantages: string[];
  certifications: string[];
  specs: SpecRow[];
  mechSpecs?: MechSpecs;
}

export type RfqStatus = 
  | 'received' 
  | 'engineering_review' 
  | 'quote_prepared' 
  | 'approved' 
  | 'rejected' 
  | 'dispatched';

export interface TimelineEvent {
  status: RfqStatus;
  title: string;
  description: string;
  timestamp: string;
}

export interface RfqItem {
  id: string; // e.g. RFQ-2026-7841
  createdAt: string;
  updatedAt: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  productCategory: string;
  requiredQty: string;
  deliveryLocation?: string;
  notes?: string;
  status: RfqStatus;
  estimatedQuoteTurnaround: string;
  quotedAmount?: string;
  assignedEngineer?: string;
  engineerRemarks?: string;
  timeline: TimelineEvent[];
}

export interface ContactMessage {
  id: string;
  createdAt: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
}

export interface DashboardStats {
  totalRfqs: number;
  pendingReview: number;
  quotesPrepared: number;
  approvedOrders: number;
  totalProductsListed: number;
  avgTurnaroundHours: number;
}
