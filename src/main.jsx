import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AppLayout from './AppLayout'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductDetail from './pages/ProductDetail'
import CartPage from './pages/CartPage'
import ErrorPage from './pages/ErrorPage'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout/>,
    children: [
      {index: true, element: <HomePage />},
      {
        path: 'shop', 
        children: [ // Need to create children property for this so the error page shows up for unknown pages
          {index: true, element: <ShopPage />},
          {path: ':slug', element: <ProductDetail />}, // SEO-friendly dynamic route
        ],
      },
      {path: 'cart', element: <CartPage />},
    ],
  },
  {path: '*', element: <ErrorPage />}, // top-level catch-all for all unknown pages
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
