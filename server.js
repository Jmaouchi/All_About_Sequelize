// require sequelize package
const Sequelize = require('sequelize');

// create a connection to the database
const sequelize = new Sequelize('sequelize-video', 'root', 'Unebellevie2018$inchalah', {
  host:'localhost',
  port:3306,
  dialect: 'mysql'
})

// connect to the sequelize-video database
async function myConnection() {
  await sequelize.authenticate();
  console.log('connetcion seccessful');
}


myConnection();

console.log("another task");