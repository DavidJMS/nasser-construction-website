import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'heroes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      // Content
      table.string('badge').nullable().defaultTo('Premium Security Solutions')
      table.string('title').nullable().defaultTo('Custom-made doors and windows with professional installation')
      table.text('description').nullable()
      
      // Buttons
      table.string('primary_button_text').nullable().defaultTo('Get a Quote')
      table.string('primary_button_link').nullable().defaultTo('#contact')
      table.string('secondary_button_text').nullable().defaultTo('View Projects')
      table.string('secondary_button_link').nullable().defaultTo('#products')
      
      // Stats
      table.string('stats_text').nullable().defaultTo('500+ Happy Clients')
      
      // Images (Paths/URLs)
      table.string('image1').nullable().defaultTo('/images/about-house.png')
      table.string('image2').nullable().defaultTo('/images/hero-bg.png')
      table.string('image3').nullable().defaultTo('/images/window-product.png')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}