import SiteSetting from '#models/site_setting'
import { updateSettings } from '#validators/settings'
import type { HttpContext } from '@adonisjs/core/http'
import uploadService from '#services/upload_service'

export default class SettingsController {
  async update({ request, response }: HttpContext) {
    const payload = await request.validateUsing(updateSettings)
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { settings, cta_image } = payload

    if (cta_image) {
      await uploadService.delete(settings.cta_image!)
      settings.cta_image = await uploadService.upload(cta_image, 'settings')
    }

    for (const [key, value] of Object.entries(settings)) {
      if (value === undefined) continue
      await SiteSetting.updateOrCreate({ key }, { value: value === null ? null : String(value) })
    }

    return response.ok({
      message: 'Settings updated successfully',
      errors: [],
      data: await this.getSettingsObject(),
    })
  }

  private async getSettingsObject() {
    const settings = await SiteSetting.all()
    return settings.reduce(
      (acc, curr) => {
        acc[curr.key] = curr.value
        return acc
      },
      {} as Record<string, any>
    )
  }

  async index({ response }: HttpContext) {
    const settings = await this.getSettingsObject()
    return response.ok({
      message: 'Settings retrieved',
      errors: [],
      data: settings,
    })
  }
}
