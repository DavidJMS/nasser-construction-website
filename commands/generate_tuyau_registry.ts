/**
 * TECH DEBT — Replicates internal behavior of @tuyau/core's registry generator.
 *
 * Exists because @tuyau/core only generates the registry during `node ace serve`
 * (dev mode), not during `node ace build`. For production Docker builds we need
 * a command that runs in console mode. This file mirrors the upstream
 * generator's output format so the produced registry is byte-compatible.
 *
 * Last synced with: @tuyau/core ^1.2.2 (see package.json).
 * If you bump @tuyau/core, diff this file against the upstream generator at
 * https://github.com/Julien-R44/tuyau and re-sync any format changes.
 * Otherwise the generated registry may drift and break frontend typings.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { BaseCommand } from '@adonisjs/core/ace'
import { CommandOptions } from '@adonisjs/core/types/ace'
import { RoutesScanner } from '@adonisjs/assembler/routes_scanner'
import stringHelpers from '@adonisjs/core/helpers/string'

const DEFAULT_VALIDATION_ERROR_TYPE = '{ errors: SimpleError[] }'

export default class GenerateTuyauRegistry extends BaseCommand {
  static commandName = 'tuyau:registry'
  static description = 'Generate Tuyau client registry from routes (used in production builds)'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    const router = await this.app.container.make('router')
    router.commit()

    const routesList: Record<string, any[]> = router.toJSON()
    const appRoot = this.app.appRoot.pathname.replace(/\/$/, '')
    const scanner = new RoutesScanner(appRoot, [])

    for (const domain of Object.keys(routesList)) {
      await scanner.scan(routesList[domain])
    }

    const routes = scanner.getScannedRoutes()
    const outputDir = `${appRoot}/.adonisjs/client/registry`

    await this.#writeRegistry(outputDir, routes)
    this.logger.success(`Tuyau registry generated -> ${outputDir}`)
  }

  // Mirrors the official Tuyau normalizer: rewrites app/ subpath imports to
  // their #app/ alias form and strips .ts extensions from specifiers.
  #normalizeImportPaths(typeString: string): string {
    return typeString
      .replace(/import\('app\//g, "import('#app/")
      .replace(/\.ts'\)/g, "')")
  }

  #sanitizeTokens(tokens: any[]) {
    return tokens.map(({ old, type, val, end }: any) => ({ old, type, val, end }))
  }

  #wrapResponseType(responseType: string): string {
    if (responseType === 'unknown' || responseType === '{}') return responseType
    if (responseType.startsWith('ReturnType<'))
      return `ExtractResponse<Awaited<${responseType}>>`
    return `ExtractResponse<${responseType}>`
  }

  #wrapErrorResponseType(responseType: string): string {
    if (responseType === 'unknown' || responseType === '{}') return 'unknown'
    if (responseType.startsWith('ReturnType<'))
      return `ExtractErrorResponse<Awaited<${responseType}>>`
    return `ExtractErrorResponse<${responseType}>`
  }

  #runtimeEntry(route: any): string {
    return `  '${route.name}': {
    methods: ${JSON.stringify(route.methods)},
    pattern: '${route.pattern}',
    tokens: ${JSON.stringify(this.#sanitizeTokens(route.tokens ?? []))},
    types: placeholder as Registry['${route.name}']['types'],
  }`
  }

  #typesEntry(route: any): string {
    const rawRequest = route.request?.type ?? '{}'
    const requestType = this.#normalizeImportPaths(rawRequest)
    const rawResponseType = route.response?.type ?? 'unknown'
    const responseType = this.#wrapResponseType(rawResponseType)
    const hasValidator = requestType !== '{}'

    let errorResponseType = this.#wrapErrorResponseType(rawResponseType)
    if (hasValidator) {
      const validationError = `{ status: 422; response: ${DEFAULT_VALIDATION_ERROR_TYPE} }`
      errorResponseType =
        errorResponseType === 'unknown'
          ? validationError
          : `${errorResponseType} | ${validationError}`
    }

    const dynamicParams = (route.tokens ?? []).filter((t: any) => t.type === 1 || t.type === 2)
    const paramsType = dynamicParams
      .map((t: any) => (t.type === 2 ? `'*': ParamValue[]` : `${t.val}: ParamValue`))
      .join('; ')
    const paramsTuple = dynamicParams.map(() => 'ParamValue').join(', ')

    const isGet = route.methods[0] === 'GET' || route.methods[0] === 'HEAD'
    const bodyType = !hasValidator || isGet ? '{}' : `ExtractBody<${requestType}>`
    const queryType = !hasValidator
      ? '{}'
      : isGet
        ? `ExtractQueryForGet<${requestType}>`
        : `ExtractQuery<${requestType}>`

    return `  '${route.name}': {
    methods: ${JSON.stringify(route.methods)}
    pattern: '${route.pattern}'
    types: {
      body: ${bodyType}
      paramsTuple: [${paramsTuple}]
      params: ${paramsType ? `{ ${paramsType} }` : '{}'}
      query: ${queryType}
      response: ${responseType}
      errorResponse: ${errorResponseType}
    }
  }`
  }

  // Uses stringHelpers.camelCase (same as the official Tuyau generator) so
  // route names like admin_hero or admin-hero are normalized consistently.
  #buildTree(routes: any[]): Map<string, any> {
    const tree = new Map<string, any>()
    for (const route of routes) {
      const segments = route.name.split('.')
      let current = tree
      for (let i = 0; i < segments.length; i++) {
        const seg = stringHelpers.camelCase(segments[i])
        const isLast = i === segments.length - 1
        if (isLast) {
          if (current.has(seg) && current.get(seg) instanceof Map) {
            current.get(seg).set('$self', { routeName: route.name })
          } else {
            current.set(seg, { routeName: route.name })
          }
        } else {
          if (!current.has(seg)) {
            current.set(seg, new Map())
          } else if (!(current.get(seg) instanceof Map)) {
            const m = new Map()
            m.set('$self', current.get(seg))
            current.set(seg, m)
          }
          current = current.get(seg)
        }
      }
    }
    return tree
  }

  #renderTree(tree: Map<string, any>, indent = 2): string {
    const sp = ' '.repeat(indent)
    const lines: string[] = []
    for (const [key, value] of tree) {
      if (key === '$self') continue
      if (value instanceof Map) {
        const self = value.get('$self')
        if (self) {
          lines.push(`${sp}${key}: typeof routes['${self.routeName}'] & {`)
          lines.push(this.#renderTree(value, indent + 2))
          lines.push(`${sp}}`)
        } else {
          lines.push(`${sp}${key}: {`)
          lines.push(this.#renderTree(value, indent + 2))
          lines.push(`${sp}}`)
        }
      } else {
        lines.push(`${sp}${key}: typeof routes['${value.routeName}']`)
      }
    }
    return lines.join('\n')
  }

  async #writeRegistry(outputDir: string, routes: any[]) {
    const runtimeEntries = routes.map((r) => this.#runtimeEntry(r)).join(',\n')
    const typesEntries = routes.map((r) => this.#typesEntry(r)).join('\n')
    const tree = this.#buildTree(routes)
    const treeInterface = this.#renderTree(tree)

    const indexTs = `/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
${runtimeEntries},
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
`

    const schemaDts = `/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
${typesEntries}
}
`

    const treeDts = `/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
${treeInterface}
}
`

    await mkdir(outputDir, { recursive: true })
    await Promise.all([
      writeFile(`${outputDir}/index.ts`, indexTs),
      writeFile(`${outputDir}/schema.d.ts`, schemaDts),
      writeFile(`${outputDir}/tree.d.ts`, treeDts),
    ])
  }
}
