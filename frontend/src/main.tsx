import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.tsx'
import './index.css'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes: data stays "fresh"
      gcTime: 1000 * 60 * 30,   // 30 minutes: cache garbage collection time
      retry: 1,                 // small retry for unstable networks
      refetchOnWindowFocus: false, // prevents annoying refetches when tab switches
      refetchOnReconnect: true,    // good for mobile/offline recovery
      refetchOnMount: true,        // ensures freshness when navigating
    },
  },
})


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
