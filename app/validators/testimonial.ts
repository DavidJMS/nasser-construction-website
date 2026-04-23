import vine from '@vinejs/vine'

export const testimonialValidator = vine.create(
  vine.object({
    author: vine.string().trim().minLength(2),
    role: vine.string().trim().nullable().optional(),
    content: vine.string().trim().minLength(10),
    rating: vine.number().min(1).max(5).optional(),
    order: vine.number().optional(),
    avatar_url: vine
      .file({ size: '5mb', extnames: ['jpg', 'png', 'jpeg', 'webp'] })
      .optional()
      .nullable(),
  })
)
