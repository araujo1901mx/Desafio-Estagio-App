const { Model, Sequelize } = require('sequelize');

class User extends Model {
    static init (sequelize) {
        super.init(
        {
        
        name: {
        type: Sequelize.STRING,
        allowNull: false
      },
        birthday: {
        type: Sequelize.DATAONLY,
        allowNull: false
      },
        CPF: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
        password: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    },
            { Sequelize },
        )
    }
}

module.exports = User;