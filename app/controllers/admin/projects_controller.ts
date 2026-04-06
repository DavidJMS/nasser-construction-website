import Project from '#models/project'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProjectsController {
  async index({ inertia }: HttpContext) {
    const projects = await Project.query().orderBy('order', 'asc')
    return inertia.render('admin/projects/index', { projects })
  }

  async store({ request, response, session }: HttpContext) {
    const data = request.all()
    await Project.create(data)
    session.flash('success', 'Proyecto creado correctamente')
    return response.redirect().back()
  }

  async update({ params, request, response, session }: HttpContext) {
    const project = await Project.findOrFail(params.id)
    const data = request.all()
    project.merge(data)
    await project.save()
    session.flash('success', 'Proyecto actualizado')
    return response.redirect().back()
  }

  async destroy({ params, response, session }: HttpContext) {
    const project = await Project.findOrFail(params.id)
    await project.delete()
    session.flash('success', 'Proyecto eliminado')
    return response.redirect().back()
  }
}