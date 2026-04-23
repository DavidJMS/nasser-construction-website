import vine from '@vinejs/vine'

export const whyChooseValidator = vine.create(
  vine.object({
    title: vine.string().trim().minLength(3),
    description: vine.string().trim().minLength(10),
    icon: vine.string().trim().nullable().optional(),
    order: vine.number().optional(),
  })
)
