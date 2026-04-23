import { queryClient } from '~/utils/client'
import Layout from '~/layouts/default'
import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { Toaster } from 'sileo'

export default function render(page: any) {
  const cache = createCache()
  return createInertiaApp({
    page,
    render: (element) => {
      return ReactDOMServer.renderToString(
        <StyleProvider cache={cache} hashPriority="high">
          <QueryClientProvider client={queryClient}>
            <Toaster position="top-center" />
            {element}
          </QueryClientProvider>
        </StyleProvider>
      )
    },
    resolve: (name) => {
      return resolvePageComponent(
        `../pages/${name}.tsx`,
        import.meta.glob('../pages/**/*.tsx', { eager: true })
      ).then((module: any) => {
        if (module.default.layout === undefined) {
          module.default.layout = (page: any) => <Layout>{page}</Layout>
        }
        return module
      })
    },
    setup: ({ App, props }) => {
      return (
        <QueryClientProvider client={queryClient}>
          <StyleProvider cache={cache} hashPriority="high">
            <Toaster position="top-center" />
            <App {...props} />
          </StyleProvider>
        </QueryClientProvider>
      )
    },
  }).then((res) => ({
    ...res,
    head: [...(res.head || []), extractStyle(cache)],
  }))
}
