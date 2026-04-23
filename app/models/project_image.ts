import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Project from '#models/project'
import { ProjectImageSchema } from '#database/schema'

export default class ProjectImage extends ProjectImageSchema {
  @belongsTo(() => Project)
  declare project: BelongsTo<typeof Project>
}
