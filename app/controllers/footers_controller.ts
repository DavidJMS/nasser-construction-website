import Footer from '#models/footer'
import type { HttpContext } from '@adonisjs/core/http'
import { updateFooter } from '#validators/footer'

export default class FootersController {
  async update({ request, response }: HttpContext) {
    const payload = await request.validateUsing(updateFooter)
    const footer = await Footer.firstOrCreate({}, {})

    footer.merge(payload)
    await footer.save()

    return response.ok({
      message: 'Footer section updated successfully',
      errors: [],
      data: footer,
    })
  }

  async show({ response }: HttpContext) {
    const footer = await Footer.first()
    return response.ok({
      message: 'Footer data retrieved',
      errors: [],
      data: footer?.$original,
    })
  }
}