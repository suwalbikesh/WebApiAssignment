var Sequelize = require('sequelize');

var sequelize = new Sequelize('image','root','password',{
    host : 'localhost',
    dialect : 'mysql',
    logging : false
});

var seq = sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection is successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports = {
      sequelize,
      Sequelize,
      seq
  }
