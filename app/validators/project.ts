import vine from '@vinejs/vine'

export const updateProject = vine.create(
  vine.object({
    title: vine.string().trim(),
    category: vine.string().trim(),
    description: vine.string().trim().nullable().optional(),
    link: vine.string().trim().nullable().optional(),
    order: vine.number().optional(),
    imageUrl: vine
      .file({ size: '5mb', extnames: ['jpg', 'png', 'jpeg', 'webp'] })
      .optional()
      .nullable(),
    gallery: vine
      .array(vine.file({ size: '5mb', extnames: ['jpg', 'png', 'jpeg', 'webp'] }))
      .optional(),
    keep_gallery_ids: vine.array(vine.number()).optional(),
  })
)
