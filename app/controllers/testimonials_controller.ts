import Testimonial from '#models/testimonial'
import { testimonialValidator } from '#validators/testimonial'
import type { HttpContext } from '@adonisjs/core/http'
import uploadService from '#services/upload_service'

export default class TestimonialsController {
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(testimonialValidator)

    let avatarUrl = null
    if (payload.avatar_url) {
      avatarUrl = await uploadService.upload(payload.avatar_url, 'testimonials')
    }

    const testimonial = await Testimonial.create({
      author: payload.author,
      role: payload.role,
      content: payload.content,
      rating: payload.rating,
      order: payload.order,
      avatarUrl,
    })

    return response.ok({
      message: 'Testimonial created successfully',
      errors: [],
      data: testimonial,
    })
  }

  async update({ params, request, response }: HttpContext) {
    const testimonial = await Testimonial.findOrFail(params.id)
    const payload = await request.validateUsing(testimonialValidator)

    let avatarUrl = testimonial.avatarUrl
    if (payload.avatar_url) {
      if (testimonial.avatarUrl) {
        await uploadService.delete(testimonial.avatarUrl)
      }
      avatarUrl = await uploadService.upload(payload.avatar_url, 'testimonials')
    }

    testimonial.merge({
      author: payload.author,
      role: payload.role,
      content: payload.content,
      rating: payload.rating,
      order: payload.order,
      avatarUrl,
    })

    await testimonial.save()

    return response.ok({
      message: 'Testimonial updated successfully',
      errors: [],
      data: testimonial,
    })
  }

  async destroy({ params, response }: HttpContext) {
    const testimonial = await Testimonial.findOrFail(params.id)
    if (testimonial.avatarUrl) {
      await uploadService.delete(testimonial.avatarUrl)
    }
    await testimonial.delete()

    return response.ok({
      message: 'Testimonial deleted successfully',
      errors: [],
      data: null,
    })
  }

  async index({ response }: HttpContext) {
    const testimonials = await Testimonial.query().orderBy('order', 'asc')
    return response.ok({
      message: 'Testimonial list retrieved',
      errors: [],
      data: testimonials,
    })
  }

  async show({ params, response }: HttpContext) {
    const testimonial = await Testimonial.findOrFail(params.id)
    return response.ok({
      message: 'Testimonial data retrieved',
      errors: [],
      data: testimonial,
    })
  }
}
