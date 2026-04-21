import AboutUs from '#models/about_us'
import AboutUsFeature from '#models/about_us_feature'
import { updateAboutUs } from '#validators/about_us'
import type { HttpContext } from '@adonisjs/core/http'
import uploadService from '#services/upload_service'

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
      await uploadService.delete(aboutUs.image1)
      aboutUs.image1 = await uploadService.upload(image1, 'about')
    }

    // Handle Image 2
    if (image2) {
      await uploadService.delete(aboutUs.image2)
      aboutUs.image2 = await uploadService.upload(image2, 'about')
    }

    await aboutUs.save()

    // Handle Features (Syncing)
    if (features) {
      // If features comes as a JSON string from FormData, parse it
      const featuresList = typeof features === 'string' ? JSON.parse(features) : features

      const incomingIds = featuresList.filter((f: any) => f.id).map((f: any) => Number(f.id))

      // Delete features not in incoming list
      await AboutUsFeature.query()
        .where('aboutUsId', aboutUs.id)
        .whereNotIn('id', incomingIds)
        .delete()

      // Update or Create
      for (const featureData of featuresList) {
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
        } else {
          await AboutUsFeature.create({
            aboutUsId: aboutUs.id,
            title: featureData.title,
            description: featureData.description,
            icon: featureData.icon,
            order: featureData.order,
          })
        }
      }
    }

    return response.ok({
      message: 'Sección About Us actualizada correctamente',
      errors: [],
      data: await aboutUs.refresh(),
    })
  }

  async show({ response }: HttpContext) {
    const aboutUs = await AboutUs.query().first()
    return response.ok({
      message: 'Datos de About Us recuperados',
      errors: [],
      data: aboutUs,
    })
  }
}
