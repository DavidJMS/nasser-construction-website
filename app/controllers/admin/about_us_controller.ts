import AboutUs from '#models/about_us'
import AboutUsFeature from '#models/about_us_feature'
import { updateAboutUs } from '#validators/update_about_us'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class AboutUsController {
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
      data: await aboutUs.refresh(),
    })
  }
}
