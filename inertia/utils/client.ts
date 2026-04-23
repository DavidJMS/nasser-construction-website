import { registry } from '~registry'
import { createTuyau } from '@tuyau/core/client'
import { QueryClient } from '@tanstack/react-query'
import { createTuyauReactQueryClient } from '@tuyau/react-query'

/**
 * The standard TanStack Query client.
 * Shared between CSR and SSR.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
})

/**
 * The core Tuyau client.
 */
export const client = createTuyau({
  baseUrl: '/',
  registry,
  credentials: 'same-origin',
})

/**
 * The React Query integration client for Tuyau.
 * Provides type-safe hooks like queryOptions() and mutationOptions().
 */
export const api = createTuyauReactQueryClient({
  client,
})
