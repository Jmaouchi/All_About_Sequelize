// require sequelize package
const Sequelize = require('sequelize');
const { DataTypes, Op } = Sequelize;
// get access to the .env file
require('dotenv').config();


// create a connection to the database
const sequelize = new Sequelize('sequelize-video', 'root', process.env.MYSQL, {
  dialect: 'mysql'
})


// create a users table
const Student = sequelize.define('student', {
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
  favorite_class: {
    type: DataTypes.STRING(25),
    defaultValue: "Computer Science"
  },
  school_year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  subscribed_to_wittcode: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
},
{
  // mysql will plurielize the tabla name by default (it will add an s at the end, so with this it will freez it and the name will stay the same) 
  freezeTableName: true,
  // this will remove the updatedAt and createdAt collumns 
  timestamps: false,
});

// sync the model and table to the database (connect to the database)
Student.sync({ alter: false }).then((data) => {
  /* add multiple data to table
  return Student.bulkCreate([
    {
      name: 'jugurta',
      favorite_class: 'computer',
      school_year:22,
      subscribed_to_wittcode: true 
    },
    {
      name: 'ali',
      favorite_class: 'afous',
      school_year:29,
      subscribed_to_wittcode: true 
    },
    {
      name: 'yuva',
      favorite_class: 'plombie',
      school_year:32,
      subscribed_to_wittcode: true 
    },
  ])
  */


  Student.findAll({
    // get only the name
    attributes: ['name'],
    // get all the data where favorite_class is computer or subscribed_to_wittcode is = true
    where:{
      [Op.or]: {favorite_class: 'computer', subscribed_to_wittcode: true}
    }
  })
  .then((data) => {
    data.forEach(element => {
      console.log(element.toJSON());
    });
  })


  Student.findAll({
    // get all students that has same school_year and name the column 'num_students'
    attributes: [
      // get the school years 
      'school_year',
      // this will get the sum of students 
      [sequelize.fn('COUNT', sequelize.col('school_year')), 'num_students']],
      // and this will groupe it by school_year or how many school year are the same ( this will give ass how many students for each school_year)
      group: 'school_year'
  })
  .then((data) => {
    data.forEach(element => {
      console.log(element.toJSON());
    });
  })

})




