import { HeroSchema } from '#database/schema'
import { column } from '@adonisjs/lucid/orm'

export default class Hero extends HeroSchema {
  @column({ columnName: 'image1' })
  declare image1: string | null

  @column({ columnName: 'image2' })
  declare image2: string | null

  @column({ columnName: 'image3' })
  declare image3: string | null
}