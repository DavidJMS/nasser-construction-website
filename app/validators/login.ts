import vine from '@vinejs/vine'

export const login = vine.create(
  vine.object({
    email: vine.string().email().trim(),
    password: vine.string().trim(),
  })
)
