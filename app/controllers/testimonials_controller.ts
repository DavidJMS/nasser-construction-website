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
      message: 'Testimonio creado correctamente',
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
      message: 'Testimonio actualizado correctamente',
      errors: [],
      data: testimonial,
    })
  }

  async destroy({ params, response }: HttpContext) {
    const testimonial = await Testimonial.findOrFail(params.id)
    await testimonial.delete()

    return response.ok({
      message: 'Testimonio eliminado correctamente',
      errors: [],
      data: null,
    })
  }

  async index({ response }: HttpContext) {
    const testimonials = await Testimonial.query().orderBy('order', 'asc')
    return response.ok({
      message: 'Lista de testimonios recuperada',
      errors: [],
      data: testimonials,
    })
  }

  async show({ params, response }: HttpContext) {
    const testimonial = await Testimonial.findOrFail(params.id)
    return response.ok({
      message: 'Datos del testimonio recuperados',
      errors: [],
      data: testimonial,
    })
  }
}
