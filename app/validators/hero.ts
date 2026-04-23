import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when updating the hero section
 */
export const updateHero = vine.create(
  vine.object({
    badge: vine.string().trim().nullable().optional(),
    title: vine.string().trim().nullable().optional(),
    description: vine.string().trim().nullable().optional(),
    primaryButtonText: vine.string().trim().nullable().optional(),
    primaryButtonLink: vine.string().trim().nullable().optional(),
    secondaryButtonText: vine.string().trim().nullable().optional(),
    secondaryButtonLink: vine.string().trim().nullable().optional(),
    statsText: vine.string().trim().nullable().optional(),
    image1: vine
      .file({ size: '5mb', extnames: ['jpg', 'png', 'jpeg', 'webp'] })
      .optional()
      .nullable(),
    image2: vine
      .file({ size: '5mb', extnames: ['jpg', 'png', 'jpeg', 'webp'] })
      .optional()
      .nullable(),
    image3: vine
      .file({ size: '5mb', extnames: ['jpg', 'png', 'jpeg', 'webp'] })
      .optional()
      .nullable(),
  })
)
