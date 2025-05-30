import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import router from './Routers/router.jsx'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import AuthProviders from './Providers/AuthProviders.jsx'
import { HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProviders>
        <HelmetProvider>
          <RouterProvider router={router}></RouterProvider> 
        </HelmetProvider>
      </AuthProviders>
    </QueryClientProvider>

  </StrictMode>,
)
