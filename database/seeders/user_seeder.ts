import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.updateOrCreateMany(
      ['email'],
      [
        {
          fullName: 'Admin Nasser',
          email: 'admin@admin.com',
          password: 'Silenxame1234',
        },
      ]
    )
  }
}
