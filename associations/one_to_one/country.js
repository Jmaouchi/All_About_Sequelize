// require sequelize package
const Sequelize = require('sequelize');
const { DataTypes, Op } = Sequelize;
// get access to the .env file
require('dotenv').config();


// create a connection to the database
const sequelize = new Sequelize('sequelize-video', 'root', 'Unebellevie2018$inchalah', {
  dialect: 'mysql'
})


// create a users table
const Country = sequelize.define('country', {
  country_name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
},
{
  freezeTableName: true,
  timestamps: false
});


// create a users table
const Capital = sequelize.define('capital', {
  capital_name: {
    type: DataTypes.STRING,
    unique: true
  }
},
{
  freezeTableName: true,
  timestamps: false
});


// one to one association, and this will create a column name countryId on the capital table as a foreign key 
Country.hasOne(Capital, {foreignKey: 'country_capital_association'}); // you can name it however you want


// create both tables using sequelize 
sequelize.sync({ alter: true }).then(() => {
  
  //  // seed some data to the Country table
  // Country.bulkCreate([
  //   {
  //     country_name: 'spain'
  //   },  
  //   {
  //     country_name: 'France'
  //   },
  //   {
  //     country_name: 'Germany'
  //   },
  //   {
  //     country_name: 'England'
  //   }
  // ])

  // // seed some data to the Capital table
  // Capital.bulkCreate([
  //   {
  //     capital_name: 'London'
  //   },
  //   {
  //     capital_name: 'Madrid'
  //   },  
  //   {
  //     capital_name: 'Paris'
  //   },
  //   {
  //     capital_name: 'Berlin'
  //   }
  // ])

  // start here
  Country.hasOne(Capital, {onDelete: 'CASCADE'});
  Capital.hasOne(Country, {onDelete: 'CASCADE'});

  let country , capital;
  sequelize.sync({alter: true}).then(() => {

  return Country.findOne ({
    where: {
      country_name: 'France'
    }
  })
  }).then((data) => {
    country = data
    return Capital.findOne({
      where: {
        capital_name: 'Paris'
      }
    })
  }).then((data) => {
    capital = data
    return country.setCapital(capital)
  }).then((data) => {
    console.log(data);
  })
  }).catch((err) => {
    console.log(err);
})

