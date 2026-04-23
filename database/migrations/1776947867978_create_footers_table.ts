import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'footers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('brand_title').nullable()
      table.string('brand_subtitle').nullable()
      table.text('description').nullable()
      table.string('copyright').nullable()
      table.string('crafted').nullable()
      table.string('social_facebook').nullable()
      table.string('social_x').nullable()
      table.string('social_instagram').nullable()
      table.string('social_linkedin').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}