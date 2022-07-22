require('dotenv').config()
const app = require('./src/app.js')
const { sequelize } = require('./src/db.js')

const PORT = process.env.PORT

sequelize.sync({ alter: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server started port ${PORT}!`)
  })
})
