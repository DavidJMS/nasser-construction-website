import Hero from '#models/hero'
import Project from '#models/project'
import Service from '#models/service'
import Testimonial from '#models/testimonial'
import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  async index({ inertia }: HttpContext) {
    const hero = await Hero.first()
    const services = await Service.query().orderBy('order', 'asc')
    const projects = await Project.query().orderBy('order', 'asc')
    const testimonials = await Testimonial.query().orderBy('order', 'asc')

    return inertia.render('home/index', {
      hero,
      services,
      projects,
      testimonials,
    })
  }
}
