const Sequelize = require('sequelize');
const dbConfig  = require('../config/database');

const User    = require('../models/User');
const School  = require('../models/School');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

// Cria a conexão com o banco
let connection;

if (process.env.DATABASE_URL) {
    // Na nuvem (Neon) — usa a connection string direta com SSL
    connection = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: { require: true, rejectUnauthorized: false }
        },
        define: {
            timestamps: true,
            underscored: true,
            underscoredAll: true
        }
    });
} else {
    // Local — usa as credenciais do config/database.js
    connection = new Sequelize(
        dbConfig.database,
        dbConfig.username,
        dbConfig.password,
        {
            ...dbConfig,
            define: {
                timestamps: true,
                underscored: true,
                underscoredAll: true
            }
        }
    );
}

// Inicializa cada Model passando a conexão para eles
User.init(connection);
School.init(connection);
Teacher.init(connection);
Student.init(connection);

// Define os relacionamentos entre as tabelas
Teacher.associate(connection.models);
Student.associate(connection.models);

module.exports = connection;
