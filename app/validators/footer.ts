import vine from '@vinejs/vine'

export const updateFooter = vine.create(
  vine.object({
    brandTitle: vine.string().trim().nullable().optional(),
    brandSubtitle: vine.string().trim().nullable().optional(),
    description: vine.string().trim().nullable().optional(),
    copyright: vine.string().trim().nullable().optional(),
    crafted: vine.string().trim().nullable().optional(),
    socialFacebook: vine.string().trim().nullable().optional(),
    socialX: vine.string().trim().nullable().optional(),
    socialInstagram: vine.string().trim().nullable().optional(),
    socialLinkedin: vine.string().trim().nullable().optional(),
  })
)