import Hero from '#models/hero'
import Project from '#models/project'
import Service from '#models/service'
import Testimonial from '#models/testimonial'
import AboutUs from '#models/about_us'
import Footer from '#models/footer'
import Cta from '#models/cta'
import type { HttpContext } from '@adonisjs/core/http'
import WhyChoose from '#models/why_choose'

export default class HomeController {
  async index({ inertia }: HttpContext) {
    const hero = await Hero.firstOrCreate(
      {},
      {
        badge: 'Premium Security Solutions',
        title: 'Custom-made doors and windows with professional installation',
        description:
          'We install security doors and reinforced windows with premium finishes. Invisible security for your peace of mind.',
        primaryButtonText: 'Get a Quote',
        primaryButtonLink: '#contact',
        secondaryButtonText: 'View Projects',
        secondaryButtonLink: '#products',
        statsText: '500+ Happy Clients',
        image1: '/images/about-house.png',
        image2: '/images/hero-bg.png',
        image3: '/images/window-product.png',
      }
    )
    const services = await Service.query().orderBy('order', 'asc')
    const projects = await Project.query().preload('images').orderBy('order', 'asc')
    const testimonials = await Testimonial.query().orderBy('order', 'asc')
    const aboutUs = await AboutUs.query().first()
    const footer = await Footer.query().first()
    const cta = await Cta.query().first()
    const whyChoose = await WhyChoose.query().orderBy('order', 'asc')

    return inertia.render('home/index', {
      hero: hero?.serialize() || {},
      services: services.map((service) => service.serialize()),
      projects: projects.map((project) => project.serialize()),
      testimonials: testimonials.map((testimonial) => testimonial.serialize()),
      aboutUs: aboutUs?.serialize() || {},
      footer: footer?.serialize() || null,
      cta: cta?.serialize() || {},
      whyChoose: whyChoose.map((f) => f.serialize()),
    })
  }

  async about({ inertia }: HttpContext) {
    const aboutUs = await AboutUs.query().first()
    const footer = await Footer.query().first()
    const ctas = await Cta.query().orderBy('order', 'asc')

    return inertia.render('about/index', {
      aboutUs,
      footer: footer?.serialize() || null,
      ctas: ctas.map((cta) => cta.serialize()),
    })
  }

  async project({ inertia, response }: HttpContext) {
    try {
      const footer = await Footer.query().first()
      const ctas = await Cta.query().orderBy('order', 'asc')

      return inertia.render('projects/show', {
        footer: footer?.serialize() || null,
        ctas: ctas.map((cta) => cta.serialize()),
      })
    } catch {
      return response.notFound()
    }
  }
}
