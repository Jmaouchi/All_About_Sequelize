// require sequelize package
const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
// get access to the .env file
require('dotenv').config();


// create a connection to the database
const sequelize = new Sequelize('sequelize-video', 'root', process.env.MYSQL, {
  dialect: 'mysql'
})


// create a users table
const User = sequelize.define('user', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      len: [2, 8]
    }
  },
  age: {
    type: DataTypes.INTEGER,
    // this defaultValue will create a value of 21 if the user doesst specify it
    defaultValue: 21
  },
  rocks: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
},
{
  // mysql will plurielize the tabla name by default (it will add an s at the end, so with this it will freez it and the name will stay the same) 
  freezeTableName: true,
  // this will remove the updatedAt and createdAt collumns 
  timestamps: false,
  // 

});
// this will drope all tables that exists and recreate them again
// sequelize.sync({drop: true})

// sync the model and table to the database (connect to the database)
User.sync({ alter: true/*this will update the table without droping it (not like force = true) */ }).then((data) => {
  // add multiple data to table
  return User.bulkCreate([
    {
      username: 'jugurta',
      password: '1',
      age:29,
      rocks:true 
    },
    {
      username: 'ali',
      password: '32',
      age:31,
      rocks:true 
    },
    {
      username: 'yuva',
      password: '34',
      age:31,
      rocks:true 
    }
  ], 
  /* since we used bulkCreate instead of create, and we set a validator on the password, we need to 
  add this object here to tell sequelize to use the validation*/

  {validate :true })
}).then((data) => {
  console.log('user added to database');
  data.forEach(element => {
  // update the name
  element.username = 'mohand';
  element.increment({age:1})
  return element.save(); // or data.destroy if we want to delete it
  });
}).catch((err) => {
  console.log(err);
})


