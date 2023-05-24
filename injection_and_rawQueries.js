// require sequelize package
const Sequelize = require('sequelize');
const { DataTypes, Op } = Sequelize;
const zlib = require('zlib')
const bcrypt = require('bcrypt');
const { log, error } = require('console');
// get access to the .env file
require('dotenv').config();


// create a connection to the database
const sequelize = new Sequelize('sequelize-video', 'root', process.env.MYSQL, {
  dialect: 'mysql'
})


// create a users table
const Injections = sequelize.define('injections', {
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [4,20]
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  age: {
    type: DataTypes.INTEGER
  }
},
{
  freezeTableName: true,
  timestamps: false 
});


// sync the model and table to the database (connect to the database)
Injections.sync({ alter: true }).then((data) => {
  // add multiple data to table
  // return Injections.create([
  //   {
  //     name: 'jugurta',
  //     password: '123456',
  //     email: 'jaysasd@yhaoo.com',
  //     age: 25,
  //   },
  //   {
  //     name: 'ali',
  //     password: '123456',
  //     email: 'jaysasd@yhaoo.com',
  //     age: 25,
  //   },
  //   {
  //     name: 'yuva',
  //     password: '123456',
  //     email: 'jaysasd@yhaoo.com',
  //     age: 25,
  //   }
  // ])

 // write a query to get data using sequelize
 sequelize.query('SELECT * FROM injections')
  .then((data) => {
      console.log(data);
  })
})






