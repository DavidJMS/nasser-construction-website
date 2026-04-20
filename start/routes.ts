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
    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.post('logout', [controllers.Session, 'destroy'])

    // Hero
    router.patch('admin/hero', [controllers.admin.Heros, 'update']).as('admin_hero.update')

    // About Us
    router
      .patch('admin/about_us', [controllers.admin.AboutUs, 'update'])
      .as('admin_about_us.update')

    router.resource('admin/services', controllers.admin.Services).only(['store', 'update', 'destroy'])
    router.resource('admin/projects', controllers.admin.Projects).only(['store', 'update', 'destroy'])
    router
      .resource('admin/testimonials', controllers.admin.Testimonials)
      .only(['store', 'update', 'destroy'])

    router
      .post('admin/settings/update-all', [controllers.admin.Settings, 'update'])
      .as('admin.settings.update')
    router.post('admin/settings/upload', [controllers.admin.Settings, 'upload']).as('admin.settings.upload')
  })
  .use(middleware.auth())
