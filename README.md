# SK Polychem Industries — B2B Industrial Manufacturing Platform

A full-stack, enterprise-grade B2B web application for an industrial hose and pneumatic systems manufacturer. Built with decoupled **Frontend** and **Backend** directories.

---

## 📁 Repository Architecture

```text
Design B2B Industrial Website/
├── backend/                       # REST API Server (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── controllers/           # Request handlers for RFQ, Products, Contact, Stats
│   │   ├── data/                  # Industrial product catalog with technical specs
│   │   ├── models/                # TypeScript types & database persistence store
│   │   ├── routes/                # Express API routes (/api/products, /api/rfqs, etc.)
│   │   └── server.ts              # Express application with CORS, logger, and healthcheck
│   ├── data/store.json            # Persistent JSON database with sample RFQs
│   ├── .env                       # Backend environment configuration (Port 5001)
│   ├── package.json               # Backend dependencies (express, cors, zod, tsx)
│   ├── tsconfig.json              # TypeScript configuration
│   └── README.md                  # Backend API documentation
│
├── frontend/                      # Client Application (React 19 + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/            # Nav, Footer, and UI components
│   │   ├── pages/
│   │   │   ├── Home.tsx           # Hero, company highlights, product overview
│   │   │   ├── Products.tsx       # Interactive technical catalog with spec tables
│   │   │   ├── Applications.tsx   # Industry-specific use cases
│   │   │   ├── Quality.tsx        # Standards & lab testing certifications
│   │   │   ├── About.tsx          # Factory capacity & company history
│   │   │   ├── Contact.tsx        # Live RFQ submission with backend integration
│   │   │   ├── RfqTracker.tsx     # Real-time quote tracking by RFQ reference ID
│   │   │   └── AdminDashboard.tsx # Factory console for managing quotes & statuses
│   │   ├── services/
│   │   │   └── api.ts             # Typed API client connecting to backend
│   │   ├── routes.ts              # Client router definitions
│   │   └── index.css              # Tailwind CSS v4 design system
│   ├── index.html                 # HTML shell
│   ├── vite.config.ts             # Vite config with backend proxy (/api -> :5001)
│   └── package.json               # Frontend dependencies (React 19, Lucide, Router)
│
├── package.json                   # Root orchestrator scripts
└── README.md                      # Project documentation
```

---

## ⚡ Quick Start

### 1. Install All Dependencies
Install dependencies across both root, backend, and frontend with a single command:
```bash
npm run install:all
```

### 2. Start Both Services in Development Mode
Run both backend and frontend concurrently:
```bash
npm run dev
```

- **Frontend**: Accessible at `http://localhost:8443` (or `http://localhost:5173`)
- **Backend API**: Running at `http://localhost:5001/api`
- **Health Check**: `http://localhost:5001/api/health`

---

## 🖥️ Running Services Individually

### Run Backend Only
```bash
npm run dev:backend
# Or directly inside the backend directory:
cd backend
npm run dev
```

### Run Frontend Only
```bash
npm run dev:frontend
# Or directly inside the frontend directory:
cd frontend
npm run dev
```

---

## 🔨 Production Build
To build both backend and frontend:
```bash
npm run build
```

---

## 🌟 Key Application Features

1. **Request For Quotation (RFQ) Engine**:
   - Buyers submit exact dimensions, working pressure requirements, and quantity.
   - Automatically generates an RFQ reference code (e.g., `RFQ-2026-8812`).
   - Validates input using Zod schemas on the backend.

2. **Live RFQ Tracker (`/track-rfq`)**:
   - Clients can input their RFQ ID to inspect the current stage in real-time (`Received` → `Engineering Review` → `Quotation Ready` → `Dispatched`).
   - Displays assigned engineers, burst pressure verification logs, and quoted commercial pricing.

3. **Factory Admin & Console (`/admin`)**:
   - Factory engineers and sales team can inspect all incoming inquiries.
   - Update quotation statuses, add engineering remarks, and submit quoted values.
   - Live KPI metrics for quotes turnaround and active leads.

4. **Product Catalog & Dimensional Specs (`/products`)**:
   - Complete technical data for TM Series (Thermoplastic), AW Series (Air/Water), PVC Braided, PU Tubing & Recoil Coils, WH Series (Welding), and FH Series (Fire Reel).
   - Inner & Outer Diameters in both metric (mm) and imperial (inches), working pressure (Bar & PSI), burst pressure, and minimum bend radius.
