/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router.get('/', [controllers.Home, 'index'])

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.post('logout', [controllers.Session, 'destroy'])

    // Admin
    router.get('admin', [controllers.admin.Dashboard, 'index'])

    // Hero
    router.get('admin/hero', [controllers.admin.Heros, 'create']).as('admin_hero.create')
    router.patch('admin/hero', [controllers.admin.Heros, 'update']).as('admin_hero.update')
    router.get('admin/hero/data', [controllers.admin.Heros, 'show']).as('admin_hero.show')

    router.resource('admin/services', controllers.admin.Services)
    router.resource('admin/projects', controllers.admin.Projects)
    router.resource('admin/testimonials', controllers.admin.Testimonials)

    router.get('admin/settings', [controllers.admin.Settings, 'index'])
    router
      .post('admin/settings/update-all', [controllers.admin.Settings, 'update'])
      .as('admin.settings.update')
  })
  .use(middleware.auth())
