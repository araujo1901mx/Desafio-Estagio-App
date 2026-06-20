const { Sequelize } = require('sequelize');
const dbConfig = require('./config/database.js');
const sequelize = new Sequelize(dbConfig);
sequelize.query('SELECT column_name, data_type FROM information_schema.columns WHERE table_name = \'users\'').then(res => {
    console.log(res[0]);
    process.exit();
}).catch(console.error);
