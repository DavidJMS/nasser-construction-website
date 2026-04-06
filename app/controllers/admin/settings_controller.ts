import SiteSetting from '#models/site_setting'
import type { HttpContext } from '@adonisjs/core/http'

export default class SettingsController {
  async index({ inertia }: HttpContext) {
    const settings = await SiteSetting.all()
    return inertia.render('admin/settings', { settings })
  }

  async update({ request, response, session }: HttpContext) {
    const data = request.input('settings')
    
    for (const [key, value] of Object.entries(data)) {
      await SiteSetting.updateOrCreate({ key }, { value: value as string })
    }

    session.flash('success', 'Configuraciones actualizadas')
    return response.redirect().back()
  }
}