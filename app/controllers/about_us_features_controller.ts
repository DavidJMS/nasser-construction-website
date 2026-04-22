import AboutUs from '#models/about_us'
import AboutUsFeature from '#models/about_us_feature'
import { createAboutUsFeature, updateAboutUsFeature } from '#validators/about_us_feature'
import type { HttpContext } from '@adonisjs/core/http'

export default class AboutUsFeaturesController {
  async index({ response }: HttpContext) {
    const aboutUs = await AboutUs.first()
    if (!aboutUs) return response.notFound({ message: 'About Us not found' })

    const features = await AboutUsFeature.query()
      .where('about_us_id', aboutUs.id)
      .orderBy('order', 'asc')
    return response.ok({ data: features })
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createAboutUsFeature)
    const aboutUs = await AboutUs.first()
    if (!aboutUs) return response.notFound({ message: 'About Us not found' })

    const feature = await AboutUsFeature.create({
      ...payload,
      aboutUsId: aboutUs.id,
    })

    return response.created({
      message: 'Feature created',
      data: feature,
    })
  }

  async show({ params, response }: HttpContext) {
    const feature = await AboutUsFeature.find(params.id)
    if (!feature) return response.notFound({ message: 'Feature not found' })
    return response.ok({ data: feature })
  }

  async update({ params, request, response }: HttpContext) {
    const feature = await AboutUsFeature.find(params.id)
    if (!feature) return response.notFound({ message: 'Feature not found' })

    const payload = await request.validateUsing(updateAboutUsFeature)
    feature.merge(payload)
    await feature.save()

    return response.ok({
      message: 'Feature updated',
      data: feature,
    })
  }

  async destroy({ params, response }: HttpContext) {
    const feature = await AboutUsFeature.find(params.id)
    if (!feature) return response.notFound({ message: 'Feature not found' })

    await feature.delete()
    return response.ok({ message: 'Feature deleted' })
  }
}
