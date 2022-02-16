const AdminJs = require('adminjs')
const AdminJsExpress = require('@adminjs/express')
const AdminJsMongoose = require('@adminjs/mongoose')

const mongoose = require('mongoose')
const UserModel = require('../models/user.model')
const CityModel = require('../models/city.model')
const PlaceModel = require('../models/place.model')

const user = require('../resources/user')
const city = require('../resources/city')
const place = require('../resources/place')

AdminJs.registerAdapter(AdminJsMongoose)

const menu = {
  profile: { name: 'Profile', icon: 'SpineLabel' },
}

const adminJs = new AdminJs({
  databases: [mongoose],
  resources: [
    { resource: UserModel, options: { parent : menu.profile, ...user } },
    { resource: CityModel, options: { parent : menu.profile, ...city } },
    { resource: PlaceModel, options: { parent: menu.profile, ...place} },
  ],
  rootPath: '/admin',
  dashboard: {
    component: AdminJs.bundle('../components/CustomDashboard')
  },
  version: {
    admin: false,
    app: '1.0.0'
  },
  branding: {
    logo: false,
    companyName: 'OH Biohealth',
    softwareBrothers: false
  },
})

const ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@example.com',
  password: process.env.ADMIN_PASSWORD || 'lovejs',
}

const router = AdminJsExpress.buildAuthenticatedRouter(adminJs, {
  cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
  cookiePassword: process.env.ADMIN_COOKIE_PASS || 'supersecret-and-long-password-for-a-cookie-in-the-browser',
  authenticate: async (email, password) => {
    if (email === ADMIN.email && password === ADMIN.password) {
      return ADMIN
    }
    return null
  }
})

module.exports = router
