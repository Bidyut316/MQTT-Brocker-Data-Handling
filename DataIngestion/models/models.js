const Sequelize = require('sequelize')
const db = require('../db/db')

const jardata = db.sequelize.define('jardata', {
 id: {
  type: Sequelize.INTEGER,
  allowNull: false,
  primaryKey: true,
  autoIncrement: true
 },
 node_mac_id: {
  type: Sequelize.STRING,
  allowNull: false,
 },
 hub_mac_id: {
  type: Sequelize.STRING,
  allowNull: false,
 },
 ble_rssi_val: {
  type: Sequelize.INTEGER,
  allowNull: true,
 },
 Vacancy_in_gms: {
  type: Sequelize.INTEGER,
  allowNull: true,
 },
 Vacancy_in_per: {
  type: Sequelize.INTEGER,
  allowNull: true,
 },
 date_time: {
  type: Sequelize.DATE,
  allowNull: true,
 }
},
 {
  freezeTableName: true
 }
);

db.sequelize
 .authenticate()
 .then(() => {
  jardata.sync()
  console.log('Connection has been established successfully.');
 })
 .catch(err => {
  console.error('Unable to connect to the database:', err);
 });


module.exports.jardata = jardata;