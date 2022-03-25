const dbConfig = require('../config/config.js');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle

  }
}
)

sequelize.authenticate()
  .then(() => {
    console.log('connected..')
  })
  .catch(err => {
    console.log('Error' + err)
  })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./user.js')(sequelize, DataTypes)
db.posts = require('./post.js')(sequelize, DataTypes)
db.paymentsq = require('./payments.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
  .then(() => {
    console.log('yes re-sync done!')
  })



// 1 to Many Relation
// db.users.hasOne(db.posts, { foreignKey: 'user_id',as: 'post'})
db.users.hasMany(db.posts, { foreignKey: 'user_id', as: 'post' })


db.posts.belongsTo(db.users, { foreignKey: 'user_id', as: 'user_details' })

db.users.addScope('blocked_users', {
  where: {
    block: false
  }
})






module.exports = db