# B2B Industrial REST API Backend

Backend service for **SK Polychem Industries** industrial hose & pneumatics manufacturing platform.

Built with **Node.js, Express, TypeScript, and Zod**.

---

## 🚀 Features

- **RFQ Engine**: Full Request For Quotation lifecycle management (`received` → `engineering_review` → `quote_prepared` → `approved` / `dispatched`).
- **Live Quotation Tracking**: Unique tracking codes (`RFQ-2026-XXXX`) allowing B2B buyers to verify engineering review status and download/view quote milestones.
- **Product Catalog API**: Full engineering specifications, dimensions (ID/OD in mm and inches), working & burst pressures (Bar/PSI), bend radius, and material standards across 6 product families.
- **Direct Factory Inquiry**: Inquiries & dealership application handling.
- **Admin Dashboard Metrics**: Real-time stats on pending RFQs, quotes ready, and product catalog counts.
- **JSON File Persistence**: File-backed storage (`data/store.json`) with initial mock seed data so testing works immediately.

---

## 🛠️ Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Run in Development Mode
```bash
npm run dev
```
The server will start at `http://localhost:5001`.

### 3. Build for Production
```bash
npm run build
npm start
```

---

## 📡 API Endpoints

### 🩺 Health & Meta
| Method | Route | Description |
|---|---|---|
| `GET` | `/api` | Service metadata & list of routes |
| `GET` | `/api/health` | Uptime and server status |

### 📋 Request For Quotation (RFQ)
| Method | Route | Description |
|---|---|---|
| `POST` | `/api/rfqs` | Submit new RFQ (Name, company, email, phone, product, quantity) |
| `GET` | `/api/rfqs` | List all RFQs (Supports `?status=...` and `?search=...`) |
| `GET` | `/api/rfqs/:id` | Get tracking details for specific RFQ by ID |
| `PATCH` | `/api/rfqs/:id/status` | Update RFQ status (`received`, `engineering_review`, `quote_prepared`, etc.) |

### 📦 Products & Engineering Specs
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/products` | Retrieve all 6 product categories & specs |
| `GET` | `/api/products/search?q=...` | Search catalog by code, ID/OD, or application |
| `GET` | `/api/products/:id` | Get category details (e.g. `thermoplastic`, `air-water`, `pu-tubing`) |

### ✉️ Contact & Messages
| Method | Route | Description |
|---|---|---|
| `POST` | `/api/contact` | Submit general or dealership inquiry |
| `GET` | `/api/contact` | List all inquiries |

### 📊 Admin Analytics
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/stats` | Summary KPI metrics (Total RFQs, quotes prepared, turnaround time) |
