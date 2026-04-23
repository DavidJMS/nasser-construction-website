import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ctas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('badge').nullable()
      table.string('title').nullable()
      table.text('description').nullable()
      table.string('button_text').nullable()
      table.string('button_link').nullable()
      table.string('image_url').nullable()
      table.integer('order').defaultTo(0)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
