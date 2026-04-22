import AboutUs from '#models/about_us'
import { updateAboutUs } from '#validators/about_us'
import type { HttpContext } from '@adonisjs/core/http'
import uploadService from '#services/upload_service'

export default class AboutUsController {
  async update({ request, response }: HttpContext) {
    const payload = await request.validateUsing(updateAboutUs)
    const aboutUs = await AboutUs.firstOrCreate({}, {})

    if (!aboutUs) {
      return response.notFound({ message: 'Configuration not found' })
    }

    const { image1, image2, ...data } = payload

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

    return response.ok({
      message: 'About Us section updated successfully',
      errors: [],
      data: await aboutUs.refresh(),
    })
  }

  async show({ response }: HttpContext) {
    const aboutUs = await AboutUs.query()
      .preload('features', (q) => q.orderBy('order', 'asc'))
      .first()
    return response.ok({
      message: 'About Us data retrieved',
      errors: [],
      data: aboutUs,
    })
  }
}
