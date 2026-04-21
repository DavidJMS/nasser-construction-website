import Hero from '#models/hero'
import type { HttpContext } from '@adonisjs/core/http'
import { updateHero } from '#validators/hero'
import uploadService from '#services/upload_service'

export default class HerosController {
  async update({ request, response }: HttpContext) {
    const payload = await request.validateUsing(updateHero)
    const hero = await Hero.firstOrCreate({}, {})

    const { image1, image2, image3, ...data } = payload

    hero.merge(data)

    if (image1) {
      await uploadService.delete(hero.image1)
      hero.image1 = await uploadService.upload(image1, 'hero')
    }

    if (image2) {
      await uploadService.delete(hero.image2)
      hero.image2 = await uploadService.upload(image2, 'hero')
    }

    if (image3) {
      await uploadService.delete(hero.image3)
      hero.image3 = await uploadService.upload(image3, 'hero')
    }

    await hero.save()

    return response.ok({
      message: 'Sección Hero actualizada correctamente',
      errors: [],
      data: hero,
    })
  }

  async show({ response }: HttpContext) {
    const hero = await Hero.first()
    return response.ok({
      message: 'Datos del Hero recuperados',
      errors: [],
      data: hero?.$original,
    })
  }
}
