const AdminJS = require('adminjs')
const { ValidationError, bundle } = AdminJS

module.exports = {
  name: 'Place',
  actions: {
    edit: {
      before: async (request, response, context) => {
        if (request.method === "post") {
          throw new ValidationError({
            name: {
              message: 'Has to be filled',
            }
          })
        }
        return request
      },
    },
  }
}
