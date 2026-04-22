import { AboutUsSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import AboutUsFeature from './about_us_feature.js'
export default class AboutUs extends AboutUsSchema {
  public static table = 'about_us'

  @hasMany(() => AboutUsFeature, {
    foreignKey: 'aboutUsId',
  })
  declare features: HasMany<typeof AboutUsFeature>
}
