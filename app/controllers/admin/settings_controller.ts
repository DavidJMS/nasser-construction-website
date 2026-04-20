import SiteSetting from '#models/site_setting'
import { updateSettings, uploadSettingsFile } from '#validators/update_settings'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class SettingsController {
  async update({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(updateSettings)
    const { settings, cta_image } = payload

    if (cta_image) {
      const ext = cta_image.extname ?? 'bin'
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`
      await cta_image.move(app.makePath('public/uploads/settings'), { name: fileName })
      settings.cta_image = `/uploads/settings/${fileName}`
    }

    for (const [key, value] of Object.entries(settings)) {
      if (value === undefined) continue
      await SiteSetting.updateOrCreate(
        { key },
        { value: value === null ? null : String(value) }
      )
    }

    session.flash('success', 'Configuraciones actualizadas')
    return response.ok({ message: 'Configuraciones actualizadas' })
  }

  async upload({ request, response }: HttpContext) {
    const payload = await request.validateUsing(uploadSettingsFile)
    const ext = payload.file.extname ?? 'bin'
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`
    await payload.file.move(app.makePath('public/uploads/settings'), { name: fileName })

    return response.ok({
      url: `/uploads/settings/${fileName}`,
    })
  }
}
