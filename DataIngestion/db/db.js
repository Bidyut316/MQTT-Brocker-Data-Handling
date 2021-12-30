const Sequelize = require('sequelize')


const sequelize = new Sequelize('brockerData', 'postgres', '1234', {
 host: 'localhost',
 dialect: 'postgres'
});
console.log("Db Connected....")

module.exports.sequelize = sequelize;