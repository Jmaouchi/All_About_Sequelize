// require sequelize package
const Sequelize = require('sequelize');
const { DataTypes, Op } = Sequelize;
const zlib = require('zlib')
const bcrypt = require('bcrypt');
const { log } = require('console');
// get access to the .env file
require('dotenv').config();


// create a connection to the database
const sequelize = new Sequelize('sequelize-video', 'root', process.env.MYSQL, {
  dialect: 'mysql'
})


// create a users table
const GetSet = sequelize.define('getSet', {
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
    },
    // getter function, that will be called before entring the data into the database
    get(){
      const rawValue = this.getDataValue('name');
      return rawValue.toUpperCase();
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
  description: {
    type: DataTypes.STRING,
    // run this before it goes to the database
    set(value){
      // base64 is to turn binary data to strings
      const compressed = zlib.deflateSync(value).toString('base64');
      this.setDataValue('description', compressed);
    },
    get(){
      const value = this.getDataValue('description');
      // we need to uncompress the value to display it for the user ( this is almost the same as hashing but this is to gain some space with large data)
      const uncompressed = zlib.inflateSync(Buffer.from(value, 'base64')); // transform the data to a base64 again
      return uncompressed.toString();
    }
  },
  // create a virtuel column
  aboutUser: {
    type: DataTypes.VIRTUAL,
    get(){
      return `${this.name} + ${this.description}`
    }
  }

},
{
  // mysql will plurielize the tabla name by default (it will add an s at the end, so with this it will freez it and the name will stay the same) 
  freezeTableName: true,
  // this will remove the updatedAt and createdAt collumns 
  timestamps: false,
});

// sync the model and table to the database (connect to the database)
GetSet.sync({ alter: false }).then((data) => {
  // add multiple data to table
  return GetSet.bulkCreate([
    {
      name: 'jugurta',
      password: "test123",
      description:"hello world!"
    },
    {
      name: 'ali',
      password: "asdasd",
      description:"This can be really large and huge"
    },
    {
      name: 'yuva',
      password:"test123",
      description:"hello world"
    },
  ]),
  
  // findeAll the data that has a name of yuva
  GetSet.findAll({
    where:{
      name:"yuva"
    }
  }).then((data) => {
    data.forEach(element => {
      console.log(element.toJSON());
    });
  })
})






