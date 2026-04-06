import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'testimonials'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('author').notNullable()
      table.string('role').nullable()
      table.text('content').notNullable()
      table.string('avatar_url').nullable()
      table.integer('rating').defaultTo(5)
      table.integer('order').defaultTo(0)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}