// require sequelize package
const Sequelize = require('sequelize');
// get access to the DataTypes and the Op 
const { DataTypes, Op } = Sequelize;
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
  // return Injections.bulkCreate([
  //   {
  //     name: 'jugurta',
  //     password: '123456',
  //     email: 'jaasssdssdd@yhaoo.com',
  //     age: 25,
  //   },
  //   {
  //     name: 'ali',
  //     password: '123456',
  //     email: 'jaysaassssdsasdsssd@yhaoo.com',
  //     age: 25,
  //   }
  // ])

//  // write a query to get data using sequelize
//  sequelize.query('SELECT * FROM injections')
//   .then((data) => {
//       console.log(data);
//   })
//   .catch(console.error('error'));


  // write a query to get data using sequelize
 return sequelize.query(`SELECT * FROM injections WHERE name LIKE :name`, {
  replacements: {name : '%ali'}
 })
 .then((data) => {
    //  console.log(data);
    [result , metadata] = data;
    console.log(result);
    console.log(metadata);
 })
 .catch(console.error('error'));
})






