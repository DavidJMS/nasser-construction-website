import Hero from '#models/hero'
import type { HttpContext } from '@adonisjs/core/http'
import { updateHero } from '#validators/update_hero'
import app from '@adonisjs/core/services/app'

export default class HerosController {
  async update({ request, response }: HttpContext) {
    const payload = await request.validateUsing(updateHero)
    const hero = await Hero.first()

    if (!hero) {
      return response.notFound({
        message: 'No se encontró la configuración del Hero',
        errors: [],
        data: null,
      })
    }

    const { image1, image2, image3, ...data } = payload

    // Merge non-file fields
    hero.merge(data)

    // Handle files
    // You can also use a helper function to avoid repetition
    if (image1) {
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 11)}.${image1.extname}`
      await image1.move(app.makePath('public/uploads/hero'), {
        name: fileName,
      })
      hero.image1 = `/uploads/hero/${fileName}`
    }

    if (image2) {
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 11)}.${image2.extname}`
      await image2.move(app.makePath('public/uploads/hero'), {
        name: fileName,
      })
      hero.image2 = `/uploads/hero/${fileName}`
    }

    if (image3) {
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 11)}.${image3.extname}`
      await image3.move(app.makePath('public/uploads/hero'), {
        name: fileName,
      })
      hero.image3 = `/uploads/hero/${fileName}`
    }

    await hero.save()

    return response.ok({
      message: 'Sección Hero actualizada correctamente',
      errors: [],
      data: hero,
    })
  }

  /**
   * API endpoint to get current hero data
   */
  async show({ response }: HttpContext) {
    const hero = await Hero.first()
    return response.ok({
      message: 'Datos del Hero recuperados',
      errors: [],
      data: hero,
    })
  }
}
