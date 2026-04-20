import Hero from '#models/hero'
import Project from '#models/project'
import Service from '#models/service'
import Testimonial from '#models/testimonial'
import AboutUs from '#models/about_us'
import SiteSetting from '#models/site_setting'
import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  async index({ inertia }: HttpContext) {
    const hero = await Hero.first()
    const services = await Service.query().orderBy('order', 'asc')
    const projects = await Project.query().preload('images').orderBy('order', 'asc')
    const testimonials = await Testimonial.query().orderBy('order', 'asc')
    const aboutUs = await AboutUs.query().first()
    const settingsRows = await SiteSetting.query()
      .where('key', 'like', 'footer_%')
      .orWhere('key', 'like', 'cta_%')
      .orWhere('key', 'like', 'site_%')
      .orWhere('key', 'like', 'contact_%')

    const settings = settingsRows.reduce(
      (acc, row) => {
        acc[row.key] = row.value
        return acc
      },
      {} as Record<string, any>
    )

    return inertia.render('home/index', {
      hero,
      services,
      projects,
      testimonials,
      aboutUs,
      settings,
    })
  }
}
