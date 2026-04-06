import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import { login } from '#validators/login'

export default class SessionController {
  async create({ inertia }: HttpContext) {
    return inertia.render('auth/login', {})
  }

  async store({ request, auth, response }: HttpContext) {
    const { email, password } = await request.validateUsing(login)
    const user = await User.query().where('email', email).first()

    if (!user || !(await hash.verify(user.password, password))) {
      return response.unauthorized({
        message: 'Inicio de sesión no exitoso',
        errors: [],
        data: null,
      })
    }

    await auth.use().login(user)

    return response.ok({
      message: 'Inicio de sesión exitoso',
      errors: [],
      data: {
        user,
      },
    })
  }

  async destroy({ auth, response }: HttpContext) {
    await auth.use().logout()
    return response.redirect('/admin')
  }
}
