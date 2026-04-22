import Testimonial from '#models/testimonial'
import { testimonialValidator } from '#validators/testimonial'
import type { HttpContext } from '@adonisjs/core/http'

export default class TestimonialsController {
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(testimonialValidator)

    const testimonial = await Testimonial.create({
      author: payload.author,
      role: payload.role,
      content: payload.content,
      rating: payload.rating,
      order: payload.order,
      avatarUrl: payload.avatar_url,
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

    testimonial.merge({
      author: payload.author,
      role: payload.role,
      content: payload.content,
      rating: payload.rating,
      order: payload.order,
      avatarUrl: payload.avatar_url,
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
