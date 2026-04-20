import Service from '#models/service'
import type { HttpContext } from '@adonisjs/core/http'

export default class ServicesController {
  async store({ request, response, session }: HttpContext) {
    const data = request.all()
    await Service.create(data)
    session.flash('success', 'Servicio creado correctamente')
    return response.redirect().back()
  }

  async update({ params, request, response, session }: HttpContext) {
    const service = await Service.findOrFail(params.id)
    const data = request.all()
    service.merge(data)
    await service.save()
    session.flash('success', 'Servicio actualizado')
    return response.redirect().back()
  }

  async destroy({ params, response, session }: HttpContext) {
    const service = await Service.findOrFail(params.id)
    await service.delete()
    session.flash('success', 'Servicio eliminado')
    return response.redirect().back()
  }
}
