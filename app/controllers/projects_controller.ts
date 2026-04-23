import Project from '#models/project'
import ProjectImage from '#models/project_image'
import { updateProject } from '#validators/project'
import type { HttpContext } from '@adonisjs/core/http'
import uploadService from '#services/upload_service'

export default class ProjectsController {
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(updateProject)
    const { imageUrl, gallery, ...data } = payload

    const project = await Project.create(data)

    // Handle Cover Image
    if (imageUrl) {
      project.imageUrl = await uploadService.upload(imageUrl, 'projects')
      await project.save()
    }

    // Handle Gallery Images
    if (gallery) {
      for (const image of gallery) {
        const url = await uploadService.upload(image, 'projects')
        await ProjectImage.create({
          projectId: project.id,
          url,
        })
      }
    }

    return response.ok({
      message: 'Project created successfully',
      errors: [],
      data: await project.refresh(),
    })
  }

  async update({ params, request, response }: HttpContext) {
    const project = await Project.findOrFail(params.id)
    const payload = await request.validateUsing(updateProject)
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { imageUrl, gallery, keep_gallery_ids, ...data } = payload

    project.merge(data)

    // Handle Cover Image
    if (imageUrl) {
      await uploadService.delete(project.imageUrl)
      project.imageUrl = await uploadService.upload(imageUrl, 'projects')
    }

    await project.save()

    // Handle Gallery Synchronization

    // 1. Remove images not in keep_gallery_ids
    const initialImages = await ProjectImage.query().where('projectId', project.id)
    const keepIds = (keep_gallery_ids || []).map(Number)

    for (const img of initialImages) {
      if (!keepIds.includes(img.id)) {
        await uploadService.delete(img.url)
        await img.delete()
      }
    }

    // 2. Add new images
    if (gallery) {
      for (const image of gallery) {
        const url = await uploadService.upload(image, 'projects')
        await ProjectImage.create({
          projectId: project.id,
          url,
        })
      }
    }

    return response.ok({
      message: 'Project updated successfully',
      errors: [],
      data: await project.refresh(),
    })
  }

  async destroy({ params, response }: HttpContext) {
    const project = await Project.findOrFail(params.id)

    // Delete cover image
    await uploadService.delete(project.imageUrl)

    // Delete gallery images
    const gallery = await ProjectImage.query().where('projectId', project.id)
    for (const img of gallery) {
      await uploadService.delete(img.url)
    }

    await project.delete()
    return response.ok({
      message: 'Project deleted successfully',
      errors: [],
      data: null,
    })
  }

  async index({ response }: HttpContext) {
    const projects = await Project.query().preload('images').orderBy('order', 'asc')
    return response.ok({
      message: 'Project list retrieved',
      errors: [],
      data: projects,
    })
  }

  async show({ params, response }: HttpContext) {
    const project = await Project.query().where('id', params.id).preload('images').firstOrFail()
    return response.ok({
      message: 'Project data retrieved',
      errors: [],
      data: project,
    })
  }
}
