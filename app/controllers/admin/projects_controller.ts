import Project from '#models/project'
import ProjectImage from '#models/project_image'
import { updateProject } from '#validators/project'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class ProjectsController {
  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(updateProject)
    const { imageUrl, gallery, ...data } = payload

    const project = await Project.create(data)

    // Handle Cover Image
    if (imageUrl) {
      const fileName = `${Date.now()}-cover.${imageUrl.extname}`
      await imageUrl.move(app.makePath('public/uploads/projects'), { name: fileName })
      project.imageUrl = `/uploads/projects/${fileName}`
      await project.save()
    }

    // Handle Gallery Images
    if (gallery) {
      for (const image of gallery) {
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${image.extname}`
        await image.move(app.makePath('public/uploads/projects'), { name: fileName })
        await ProjectImage.create({
          projectId: project.id,
          url: `/uploads/projects/${fileName}`,
        })
      }
    }

    session.flash('success', 'Proyecto creado correctamente')
    return response.redirect().back()
  }

  async update({ params, request, response, session }: HttpContext) {
    const project = await Project.findOrFail(params.id)
    const payload = await request.validateUsing(updateProject)
    const { imageUrl, gallery, ...data } = payload

    project.merge(data)

    // Handle Cover Image
    if (imageUrl) {
      const fileName = `${Date.now()}-cover.${imageUrl.extname}`
      await imageUrl.move(app.makePath('public/uploads/projects'), { name: fileName })
      project.imageUrl = `/uploads/projects/${fileName}`
    }

    await project.save()

    // Handle Gallery Images (Append new ones)
    if (gallery) {
      for (const image of gallery) {
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${image.extname}`
        await image.move(app.makePath('public/uploads/projects'), { name: fileName })
        await ProjectImage.create({
          projectId: project.id,
          url: `/uploads/projects/${fileName}`,
        })
      }
    }

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
