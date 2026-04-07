import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'about_us_features'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('order').nullable().defaultTo(0)
      table
        .integer('about_us_id')
        .nullable()
        .references('id')
        .inTable('about_us')
        .onDelete('cascade')

      // Content
      table.string('title').nullable()
      table.string('description').nullable()
      table.string('icon').nullable().defaultTo('Award')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
