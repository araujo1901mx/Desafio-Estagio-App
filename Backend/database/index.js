const Sequelize = require('sequelize');
const dbConfig  = require('../config/database');

const User    = require('../models/User');
const School  = require('../models/School');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

// Cria a conexão com o banco
const connection = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        ...dbConfig,
        define: {
            timestamps: true,      // Ativa created_at e updated_at
            underscored: true,     // Usa snake_case no banco (created_at, não createdAt)
            underscoredAll: true
        }
    }
);

// Inicializa cada Model passando a conexão para eles
User.init(connection);
School.init(connection);
Teacher.init(connection);
Student.init(connection);

// Define os relacionamentos entre as tabelas
Teacher.associate(connection.models);
Student.associate(connection.models);

module.exports = connection;
