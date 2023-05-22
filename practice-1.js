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
  // then find all data that where school_year is < 28
  .then((data) => {
    data.forEach(element => {
      console.log(element.toJSON());
      if(element.name === 'ayema'){ 
        console.log('yes');
      }else{
        return Student.findAll({
          attributes: ['school_year'],
          where:{
            school_year: {
              [Op.or]: {
                [Op.lt]: 28,
                [Op.eq]: null
              }
            }
          }
        })
        .then((data) => {
          console.log(data);
        })
      }
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


  // return one student where the school year is < 28 or = 0
  return Student.findOne({
    where:{
      school_year: {
        [Op.or]: {
          [Op.lt]: 28,
          [Op.eq]: null
        }
      }
    }
  })
  .then((data) => {
    console.log(data);
  }),



  // findOne or create it. we also added a default value to the school_year
Student.findOrCreate({
    where:{
      name: 'ayema'
    },
    defaults: {
      school_year: '57'
    }
  })
  .then((data) => {
    // object destructuring 
    const {result, created} = data;
    console.log(created);
  }),


  // find where the column is = ayema then count how many we do have with the same name
  Student.findAndCountAll({
    where:{
      name: 'ayema'
    },
    // this will log the data without using the toJSON() method
    raw: true
  })
  .then((data) => {
    // object destructuring 
    const {count, rows} = data;
    console.log(count);
    console.log(rows);
  }),
  

})






