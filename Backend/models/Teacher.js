const { Model, DataTypes } = require('sequelize');

class Teacher extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true
                },
                // A tabela só guarda as chaves estrangeiras (user_id e school_id)
                // Os dados pessoais do professor ficam na tabela 'users'
            },
            {
                sequelize,
                modelName: 'Teacher',
                tableName: 'teachers',
                underscored: true
            }
        );
    }

    // Define os relacionamentos com outros Models
    static associate(models) {
        // Um Professor pertence a um Usuário (e esse usuário tem os dados pessoais)
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        // Um Professor pertence a uma Escola
        this.belongsTo(models.School, { foreignKey: 'school_id', as: 'school' });
    }
}

module.exports = Teacher;