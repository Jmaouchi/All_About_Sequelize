// require sequelize package
const Sequelize = require('sequelize');
// get access to the .env file
require('dotenv').config();


// create a connection to the database
const sequelize = new Sequelize('sequelize-video', 'root', process.env.MYSQL, {
  dialect: 'mysql'
})


// create a users table
const User = sequelize.define('user', {
  user_id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.DataTypes.STRING
  },
  age: {
    type: Sequelize.DataTypes.INTEGER,
    defaultValue: 21
  },
  rocks: {
    type: Sequelize.DataTypes.BOOLEAN,
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
User.sync({ alter : false /*this will update the table without droping it (not like force = true) */ }).then((data) => {
  console.log("table is created");
}).catch((err) => {
  console.log(err);
})


