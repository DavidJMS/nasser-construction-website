#!/bin/sh
# Creates minimal stub files for the Tuyau client registry so the first
# `node ace build` succeeds and generates the AdonisJS indexes.
# These stubs are replaced by `node ace tuyau:registry` in the next step.
set -e

mkdir -p .adonisjs/client/registry

cat > .adonisjs/client/registry/index.ts << 'ENDOFFILE'
/* placeholder — replaced by node ace tuyau:registry */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { ApiDefinition } from './tree.d.ts'
const routes = {} as const satisfies Record<string, AdonisEndpoint>
export { routes }
export const registry = { routes, $tree: {} as ApiDefinition }
declare module '@tuyau/core/types' {
  export interface UserRegistry { routes: typeof routes; $tree: ApiDefinition }
}
ENDOFFILE

cat > .adonisjs/client/registry/schema.d.ts << 'ENDOFFILE'
export type ParamValue = string | number | bigint | boolean
export interface Registry {}
ENDOFFILE

cat > .adonisjs/client/registry/tree.d.ts << 'ENDOFFILE'
import type { routes } from './index.ts'
export interface ApiDefinition {}
ENDOFFILE
