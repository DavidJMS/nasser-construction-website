import vine from '@vinejs/vine'

export const ctaValidator = vine.create(
  vine.object({
    badge: vine.string().trim().nullable().optional(),
    title: vine.string().trim().nullable().optional(),
    description: vine.string().trim().nullable().optional(),
    buttonText: vine.string().trim().nullable().optional(),
    buttonLink: vine.string().trim().nullable().optional(),
    imageUrl: vine
      .file({ size: '5mb', extnames: ['jpg', 'png', 'jpeg', 'webp'] })
      .optional()
      .nullable(),
    order: vine.number().optional(),
  })
)
