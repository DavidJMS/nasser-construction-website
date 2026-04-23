import vine from '@vinejs/vine'

export const updateSettings = vine.create(
  vine.object({
    settings: vine.object({
      cta_badge: vine.string().trim().nullable().optional(),
      cta_title: vine.string().trim().nullable().optional(),
      cta_description: vine.string().trim().nullable().optional(),
      cta_button_text: vine.string().trim().nullable().optional(),
      cta_button_link: vine.string().trim().nullable().optional(),
      cta_image: vine.string().trim().nullable().optional(),

      footer_brand_title: vine.string().trim().nullable().optional(),
      footer_brand_subtitle: vine.string().trim().nullable().optional(),
      footer_description: vine.string().trim().nullable().optional(),
      footer_copyright: vine.string().trim().nullable().optional(),
      footer_crafted: vine.string().trim().nullable().optional(),
      footer_social_facebook: vine.string().trim().nullable().optional(),
      footer_social_x: vine.string().trim().nullable().optional(),
      footer_social_instagram: vine.string().trim().nullable().optional(),
      footer_social_linkedin: vine.string().trim().nullable().optional(),
    }),

    cta_image: vine
      .file({ size: '8mb', extnames: ['jpg', 'jpeg', 'png', 'webp', 'gif'] })
      .optional()
      .nullable(),
  })
)

export const uploadSettingsFile = vine.create(
  vine.object({
    file: vine.file({ size: '8mb', extnames: ['jpg', 'jpeg', 'png', 'webp', 'gif'] }),
  })
)
