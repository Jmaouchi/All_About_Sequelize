// require sequelize package
const Sequelize = require('sequelize');


// create a connection to the database
const sequelize = new Sequelize('sequelize-video', 'root', process.env.MYSQL, {
  host:'localhost',
  port:3306,
  dialect: 'mysql'
})


// create a users table
const users = sequelize.define('user', {
  username: {
    type: sequelize.DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: sequelize.DataTypes.STRING
  },
  age: {
    type: sequelize.DataTypes.INTEGER,
    defaultValue: 21
  }
})


users.sync().then((data) => {
  console.log("table is created");
}).catch((err) => {
  console.log(err);
})