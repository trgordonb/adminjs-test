const AdminJS = require('adminjs')
const { ValidationError, bundle } = AdminJS

module.exports = {
  name: 'User',
  actions: {
    edit: {
      before: async (request, response, context) => {
        if (request.method === "post") {
          throw new ValidationError({
            email: {
              message: 'Has to be filled',
            }
          })
        }
        return request
      },
    },
  }
}
