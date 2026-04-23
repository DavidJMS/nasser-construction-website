import WhyChoose from '#models/why_choose'
import { whyChooseValidator } from '#validators/why_choose'
import type { HttpContext } from '@adonisjs/core/http'

export default class WhyChoosesController {
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(whyChooseValidator)
    const item = await WhyChoose.create(payload)
    return response.ok({
      message: 'Feature created successfully',
      errors: [],
      data: item,
    })
  }

  async update({ params, request, response }: HttpContext) {
    const item = await WhyChoose.findOrFail(params.id)
    const payload = await request.validateUsing(whyChooseValidator)
    item.merge(payload)
    await item.save()
    return response.ok({
      message: 'Feature updated successfully',
      errors: [],
      data: item,
    })
  }

  async destroy({ params, response }: HttpContext) {
    const item = await WhyChoose.findOrFail(params.id)
    await item.delete()
    return response.ok({
      message: 'Feature deleted successfully',
      errors: [],
      data: null,
    })
  }

  async index({ response }: HttpContext) {
    const items = await WhyChoose.query().orderBy('order', 'asc')
    return response.ok({
      message: 'Why Choose Us data retrieved',
      errors: [],
      data: items,
    })
  }

  async show({ params, response }: HttpContext) {
    const item = await WhyChoose.findOrFail(params.id)
    return response.ok({
      message: 'Feature data retrieved',
      errors: [],
      data: item,
    })
  }
}
