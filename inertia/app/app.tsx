/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '~/utils/client'
import { StyleProvider } from '@ant-design/cssinjs'
import Layout from '~/layouts/default'
import AdminLayout from '~/layouts/admin'
import 'antd/dist/reset.css'
import { Toaster } from 'sileo'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp({
  progress: { color: '#07427E' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    return resolvePageComponent(`../pages/${name}.tsx`, import.meta.glob('../pages/**/*.tsx')).then(
      (module: any) => {
        if (module.default.layout === undefined) {
          if (name.startsWith('admin/')) {
            module.default.layout = (page: any) => <AdminLayout>{page}</AdminLayout>
          } else {
            module.default.layout = (page: any) => <Layout>{page}</Layout>
          }
        }
        return module
      }
    )
  },

  setup({ el, App, props }) {
    createRoot(el).render(
      <StyleProvider hashPriority="high">
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-right" />
          <App {...props} />
        </QueryClientProvider>
      </StyleProvider>
    )
  },
})
