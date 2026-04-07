import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'about_us'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      // Content
      table.string('category_tag').nullable().defaultTo('Our Story')
      table.string('title_main').nullable().defaultTo('Excellence in ')
      table.string('title_highlight').nullable().defaultTo('Door & Window')
      table.string('title_suffix').nullable().defaultTo(' Installation')
      table.text('description').nullable()

      // Images
      table.string('image1').nullable().defaultTo('/images/about-house.png')
      table.string('image2').nullable().defaultTo('/images/window-install.png')

      // Button
      table.string('button_text').nullable().defaultTo('DISCOVER MORE')
      table.string('button_link').nullable().defaultTo('#contact')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
