import Cta from '#models/cta'
import { ctaValidator } from '#validators/cta'
import type { HttpContext } from '@adonisjs/core/http'
import uploadService from '#services/upload_service'

export default class CtaController {
  async index({ response }: HttpContext) {
    const ctas = await Cta.query().orderBy('order', 'asc')
    return response.ok({
      message: 'CTA list retrieved',
      errors: [],
      data: ctas,
    })
  }

  async show({ response }: HttpContext) {
    const cta = await Cta.query().first()
    return response.ok({
      message: 'CTA retrieved',
      errors: [],
      data: cta,
    })
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(ctaValidator)

    let imageUrl: string | null = null
    if (payload.image_url) {
      imageUrl = await uploadService.upload(payload.image_url, 'ctas')
    }

    const cta = await Cta.create({
      badge: payload.badge,
      title: payload.title,
      description: payload.description,
      buttonText: payload.button_text,
      buttonLink: payload.button_link,
      imageUrl,
      order: payload.order ?? 0,
    })

    return response.ok({
      message: 'CTA created successfully',
      errors: [],
      data: cta,
    })
  }

  async update({ params, request, response }: HttpContext) {
    let cta = await Cta.find(params.id)
    if (!cta) {
      cta = await Cta.query().first()
    }
    if (!cta) {
      return response.notFound({ message: 'CTA not found', errors: [] })
    }

    const payload = await request.validateUsing(ctaValidator)

    let imageUrl = cta.imageUrl
    if (payload.image_url) {
      if (cta.imageUrl) {
        await uploadService.delete(cta.imageUrl)
      }
      imageUrl = await uploadService.upload(payload.image_url, 'ctas')
    }

    cta.merge({
      badge: payload.badge,
      title: payload.title,
      description: payload.description,
      buttonText: payload.button_text,
      buttonLink: payload.button_link,
      imageUrl,
      order: payload.order ?? cta.order,
    })

    await cta.save()

    return response.ok({
      message: 'CTA updated successfully',
      errors: [],
      data: cta,
    })
  }

  async destroy({ params, response }: HttpContext) {
    const cta = await Cta.findOrFail(params.id)
    if (cta.imageUrl) {
      await uploadService.delete(cta.imageUrl)
    }
    await cta.delete()

    return response.ok({
      message: 'CTA deleted successfully',
      errors: [],
      data: null,
    })
  }
}
