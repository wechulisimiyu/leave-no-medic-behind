const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')

const generateAdminJSConfig = (AdminJSOptions):  => ({
    rootPath: '/admin',
    branding: {
      companyName: 'Leave no Medic Behind',
    },
    resources: [CreateCustomerResource(), CreateBikeResource(), CreateAppointmentResource()],
    locale: LocaleTest,
    componentLoader,
  })

module.exports = generateAdminJSConfig