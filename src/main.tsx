import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from '@tanstack/react-router'
import { queryClient, router } from './lib'
import { ThemeProvider } from './components'
import { QueryClientProvider } from '@tanstack/react-query'

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} context={{ queryClient }} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
