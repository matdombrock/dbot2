const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'dbot', 'password', {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // SQLite only
  storage: __dirname+'/database.sqlite'
});

const User = sequelize.define('user', {
  user_id: {
    type: Sequelize.STRING,
  },
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});
User.sync();

const Memory = sequelize.define('memory', {
  user_id: {
    type: Sequelize.STRING,
  },
  key:{
    type: Sequelize.STRING,
  },
  value:{
    type: Sequelize.STRING, 
  },
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});
Memory.sync();

/* User.sync({force: true}).then(function () {

}); */

module.exports = {
  User,
  Memory
};