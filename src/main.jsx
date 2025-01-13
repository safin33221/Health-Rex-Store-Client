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

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProviders>
        <RouterProvider router={router}></RouterProvider> 
      </AuthProviders>
    </QueryClientProvider>

  </StrictMode>,
)
