import { AboutUsSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import AboutUsFeature from '#models/about_us_feature'

export default class AboutUs extends AboutUsSchema {
  public static table = 'about_us'

  @hasMany(() => AboutUsFeature, {
    foreignKey: 'id',
  })
  declare features: HasMany<typeof AboutUsFeature>
}
