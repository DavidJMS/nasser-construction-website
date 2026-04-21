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
router.get('/about', [controllers.Home, 'about'])

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
    router.patch('hero', [controllers.Heros, 'update'])
    router.get('hero', [controllers.Heros, 'show'])

    // About Us
    router.patch('about_us', [controllers.AboutUs, 'update'])
    router.get('about_us', [controllers.AboutUs, 'show'])

    router.resource('services', controllers.Services)
    router.resource('projects', controllers.Projects)
    router.resource('testimonials', controllers.Testimonials)

    router.post('settings/update-all', [controllers.Settings, 'update'])

    router.get('settings', [controllers.Settings, 'index'])

    router.post('settings/upload', [controllers.Settings, 'upload'])
  })
  .use(middleware.auth())
