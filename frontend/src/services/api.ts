// API client service connecting frontend to the backend REST API

const API_BASE = import.meta.env.VITE_API_URL || '/api';

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
  id: string;
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

export interface RfqSubmissionPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  productCategory: string;
  requiredQty: string;
  deliveryLocation?: string;
  notes?: string;
}

export interface ContactSubmissionPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
}

export interface DashboardStats {
  totalRfqs: number;
  pendingReview: number;
  quotesPrepared: number;
  approvedOrders: number;
  totalProductsListed: number;
  avgTurnaroundHours: number;
}

// Helper fetch wrapper
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }
    return data;
  } catch (err: any) {
    console.error(`API Error on ${endpoint}:`, err);
    throw err;
  }
}

// API methods
export const api = {
  // Health
  checkHealth: async () => {
    return request<{ status: string; uptimeSeconds: number; timestamp: string }>('/health');
  },

  // Products
  getProducts: async () => {
    return request<{ success: boolean; count: number; data: ProductCategory[] }>('/products');
  },

  getProductById: async (id: string) => {
    return request<{ success: boolean; data: ProductCategory }>(`/products/${id}`);
  },

  searchProducts: async (q: string, minPressure?: number) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (minPressure) params.set('minPressure', minPressure.toString());
    return request<{ success: boolean; count: number; data: ProductCategory[] }>(`/products/search?${params.toString()}`);
  },

  // RFQ
  submitRfq: async (payload: RfqSubmissionPayload) => {
    return request<{ success: boolean; message: string; data: RfqItem }>('/rfqs', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  getAllRfqs: async (params?: { status?: string; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.set('status', params.status);
    if (params?.search) searchParams.set('search', params.search);
    const queryStr = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return request<{ success: boolean; count: number; data: RfqItem[] }>(`/rfqs${queryStr}`);
  },

  getRfqById: async (id: string) => {
    return request<{ success: boolean; data: RfqItem }>(`/rfqs/${id}`);
  },

  updateRfqStatus: async (id: string, update: { status: RfqStatus; engineerRemarks?: string; quotedAmount?: string }) => {
    return request<{ success: boolean; message: string; data: RfqItem }>(`/rfqs/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify(update),
    });
  },

  // Contact
  submitContact: async (payload: ContactSubmissionPayload) => {
    return request<{ success: boolean; message: string; data: any }>('/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  getContacts: async () => {
    return request<{ success: boolean; count: number; data: any[] }>('/contact');
  },

  // Stats
  getStats: async () => {
    return request<{ success: boolean; data: DashboardStats }>('/stats');
  },
};
