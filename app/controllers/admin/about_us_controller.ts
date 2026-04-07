import AboutUs from '#models/about_us'
import AboutUsFeature from '#models/about_us_feature'
import { updateAboutUs } from '#validators/update_about_us'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class AboutUsController {
  /**
   * Render the admin about us edit page
   */
  async create({ inertia }: HttpContext) {
    const aboutUs = await AboutUs.query()
      .preload('features', (q) => q.orderBy('order', 'asc'))
      .first()

    if (!aboutUs) {
      // Create initial record if not exists
      const newAboutUs = await AboutUs.create({
        categoryTag: 'Our Story',
        titleMain: 'Excellence in ',
        titleHighlight: 'Door & Window',
        titleSuffix: ' Installation',
      })

      // Create initial features
      await AboutUsFeature.createMany([
        { title: 'Experience', description: '+20 Years of experience', icon: 'Award', order: 1 },
        {
          title: 'Quality',
          description: 'Highest quality products',
          icon: 'ShieldCheck',
          order: 2,
        },
        { title: 'Installation', description: 'Certified installers', icon: 'Hammer', order: 3 },
        { title: 'Care', description: 'Exceptional service', icon: 'Users', order: 4 },
      ])

      await newAboutUs.load('features')
      return inertia.render('admin/about_us/index', { aboutUs: newAboutUs })
    }

    return inertia.render('admin/about_us/index', { aboutUs })
  }

  /**
   * Update the about us section data
   */
  async update({ request, response }: HttpContext) {
    const payload = await request.validateUsing(updateAboutUs)
    const aboutUs = await AboutUs.first()

    if (!aboutUs) {
      return response.notFound({ message: 'No se encontró la configuración' })
    }

    const { image1, image2, features, ...data } = payload

    // Update main fields
    aboutUs.merge(data)

    // Handle Image 1
    if (image1) {
      const fileName = `${Date.now()}-about1.${image1.extname}`
      await image1.move(app.makePath('public/uploads/about'), { name: fileName })
      aboutUs.image1 = `/uploads/about/${fileName}`
    }

    // Handle Image 2
    if (image2) {
      const fileName = `${Date.now()}-about2.${image2.extname}`
      await image2.move(app.makePath('public/uploads/about'), { name: fileName })
      aboutUs.image2 = `/uploads/about/${fileName}`
    }

    await aboutUs.save()

    // Handle Features (Syncing)
    if (features) {
      for (const featureData of features) {
        if (featureData.id) {
          const feature = await AboutUsFeature.find(featureData.id)
          if (feature) {
            feature.merge({
              title: featureData.title,
              description: featureData.description,
              icon: featureData.icon,
              order: featureData.order,
            })
            await feature.save()
          }
        }
      }
    }

    return response.ok({
      message: 'Sección About Us actualizada correctamente',
      data: await aboutUs.refresh().then((u) => u.load('features')),
    })
  }
}
