import Service from '#models/service'
import { serviceValidator } from '#validators/service'
import type { HttpContext } from '@adonisjs/core/http'

export default class ServicesController {
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(serviceValidator)
    const service = await Service.create(payload)
    return response.ok({
      message: 'Servicio creado correctamente',
      errors: [],
      data: service,
    })
  }

  async update({ params, request, response }: HttpContext) {
    const service = await Service.findOrFail(params.id)
    const payload = await request.validateUsing(serviceValidator)
    service.merge(payload)
    await service.save()
    return response.ok({
      message: 'Servicio actualizado correctamente',
      errors: [],
      data: service,
    })
  }

  async destroy({ params, response }: HttpContext) {
    const service = await Service.findOrFail(params.id)
    await service.delete()
    return response.ok({
      message: 'Servicio eliminado correctamente',
      errors: [],
      data: null,
    })
  }

  async index({ response }: HttpContext) {
    const services = await Service.all()
    return response.ok({
      message: 'Lista de servicios recuperada',
      errors: [],
      data: services,
    })
  }

  async show({ params, response }: HttpContext) {
    const service = await Service.findOrFail(params.id)
    return response.ok({
      message: 'Datos del servicio recuperados',
      errors: [],
      data: service,
    })
  }
}
