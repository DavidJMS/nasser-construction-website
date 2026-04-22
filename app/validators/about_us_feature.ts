import vine from '@vinejs/vine'

export const createAboutUsFeature = vine.create(
  vine.object({
    title: vine.string().trim().maxLength(255),
    description: vine.string().trim().optional(),
    icon: vine.string().trim().optional(),
    order: vine.number().optional(),
  })
)

export const updateAboutUsFeature = vine.create(
  vine.object({
    title: vine.string().trim().maxLength(255).optional(),
    description: vine.string().trim().optional(),
    icon: vine.string().trim().optional(),
    order: vine.number().optional(),
  })
)
