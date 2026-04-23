import { ProjectSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import ProjectImage from '#models/project_image'

export default class Project extends ProjectSchema {
  @hasMany(() => ProjectImage)
  declare images: HasMany<typeof ProjectImage>
}
