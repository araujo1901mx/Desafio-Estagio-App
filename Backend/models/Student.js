const { Model, DataTypes } = require('sequelize');

class Student extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                birthday: {
                    type: DataTypes.DATEONLY,
                    allowNull: false
                },
                CPF: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                    field: 'CPF'
                }
            },
            {
                sequelize,
                modelName: 'Student',
                tableName: 'students',
                underscored: true
            }
        );
    }

    // Define o relacionamento com Teacher
    static associate(models) {
        // Um Aluno pertence a um Professor
        this.belongsTo(models.Teacher, { foreignKey: 'teacher_id', as: 'teacher' });
    }
}

module.exports = Student;