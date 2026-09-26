import { createBrowserRouter } from 'react-router'
import Root from './App'
import Home from './pages/Home'
import Products from './pages/Products'
import Contact from './pages/Contact'

// The website features strictly 3 core pages (Home/Company, Products & Solutions, Contact & RFQ Center).
// All sections, applications, quality testing, and quote tracking have been merged into these 3 pages.
// Sub-routes route smoothly into the 3 merged destinations.
export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'products', Component: Products },
      { path: 'contact', Component: Contact },

      // Merged page aliases to ensure no links break
      { path: 'about', Component: Home },
      { path: 'applications', Component: Products },
      { path: 'quality', Component: Products },
      { path: 'track-rfq', Component: Contact },
      { path: 'admin', Component: Contact },
    ],
  },
])
