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
const Validation = sequelize.define('validation', {
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
    allowNull: false,
      // also we have a setter. like hash a password before going to the dataabase
      set(value){
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(value, salt);
        this.setDataValue('password', hash);
    }
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true
    },
    // another validation to check if the created email is inside this array, if so create it and if not throw an error
    validate:{
      isIn: ['maouchi@yahoo.com']
    },
  },
  age: {
    type: DataTypes.INTEGER,
    // create a outside validation function instead of the built-in validator, like isEmail
    validate: {
      isOldEnough(value){
        if(value < 21 ) {
          throw new error('hey')
        }
      }
    }
  }
},
{
  freezeTableName: true,
  timestamps: false,
});

// sync the model and table to the database (connect to the database)
Validation.sync({ alter: false }).then((data) => {
  // add multiple data to table
  return Validation.create(
    {
      name: 'jugurta',
      password: "test123",
      email: "maouchi@yahoo.com",
      age: 22
    }
  ),
  
  // findeAll the data that has a name of yuva
  Validation.findAll({})
  .then((data) => {
    data.forEach(element => {
      console.log(element.email);
    });
  })
})






