import vine from '@vinejs/vine'

export const ctaValidator = vine.create(
  vine.object({
    badge: vine.string().trim().nullable().optional(),
    title: vine.string().trim().nullable().optional(),
    description: vine.string().trim().nullable().optional(),
    button_text: vine.string().trim().nullable().optional(),
    button_link: vine.string().trim().nullable().optional(),
    image_url: vine
      .file({ size: '5mb', extnames: ['jpg', 'png', 'jpeg', 'webp'] })
      .optional()
      .nullable(),
    order: vine.number().optional(),
  })
)
