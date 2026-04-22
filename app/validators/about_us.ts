import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when updating the about us section
 */
export const updateAboutUs = vine.create(
  vine.object({
    categoryTag: vine.string().trim().nullable().optional(),
    titleMain: vine.string().trim().nullable().optional(),
    titleHighlight: vine.string().trim().nullable().optional(),
    titleSuffix: vine.string().trim().nullable().optional(),
    description: vine.string().trim().nullable().optional(),
    buttonText: vine.string().trim().nullable().optional(),
    buttonLink: vine.string().trim().nullable().optional(),
    image1: vine
      .file({ size: '5mb', extnames: ['jpg', 'png', 'jpeg', 'webp'] })
      .optional()
      .nullable(),
    image2: vine
      .file({ size: '5mb', extnames: ['jpg', 'png', 'jpeg', 'webp'] })
      .optional()
      .nullable(),
    features: vine
      .array(
        vine.object({
          id: vine.number().optional(),
          title: vine.string().trim().nullable(),
          description: vine.string().trim().nullable(),
          icon: vine.string().trim().nullable(),
          order: vine.number().optional(),
        })
      )
      .optional(),
  })
)
