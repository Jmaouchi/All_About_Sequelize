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
    type: DataTypes.STRING
  },
  age: {
    type: DataTypes.INTEGER,
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
  // add data to table
  return User.create({
    username: 'jugurta',
    password: '123',
    age:25,
    rocks:true 
  });
}).then((data) => {
  console.log('user added to database');
  data.username = 'ali';
  return data.save(); // or data.destroy if we want to delete it
}).then((data) => {
  console.log("user updated");
  // this data.JSON will return only the data filtred wich is username, password, age and rocks
  console.log(data.toJSON());
}).catch((err) => {
  console.log(err);
})


