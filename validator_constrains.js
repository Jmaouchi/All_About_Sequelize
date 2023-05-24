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
    unique: true
  //   validate: {
  //     isEmail: true
  //   // },
  //   // // another validation to check if the created email is inside this array, if so create it and if not throw an error
  //   // validate:{
  //   //   isIn: {
  //   //     args: ['maouchi@yahoo.com','djigo.maouchi@yahoo.com'],
  //   //     msg: "You entered an email that is not inside of the wanted array"
  //   //   } 
  //   // }
  },
  age: {
    type: DataTypes.INTEGER,
    // An outside validation function instead of the built-in validator, like isEmail or isNumeric
    validate: {
      isOldEnough(value){
        if(value < 21 ) {
          throw new error('hey')
        }
      }
    },
    // check if the age is a number
    validate: {
      isNumeric: {
        msg: 'You must enter a number for age!'
      }
    }
  },
  comparsn: {
    type: DataTypes.STRING
  }
},
{
  freezeTableName: true,
  timestamps: false,
  // another validation for the email, this is a model validation (for safety) 
  validate: {
    usernamePassMatch(){
      if (this.name === this.comparsn){
        // throw an error if the validation fails, and stop the process
        throw new error('password cannot be your username!')
      }else{
        console.log('yes you got this ');
      }
    } 
  }  
});

// sync the model and table to the database (connect to the database)
Validation.sync({ alter: false }).then((data) => {
  // add multiple data to table
  return Validation.create(
    {
      name: 'neknek',
      password: 'neknek',
      email: 'nes@yhaoo.com',
      age: 25,
      comparsn: 'neknssek'
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






