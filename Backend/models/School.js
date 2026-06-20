const { Model, DataTypes } = require('sequelize');

class School extends Model {
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
                address: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            {
                sequelize,
                modelName: 'School',
                tableName: 'schools',
                underscored: true
            }
        );
    }
}

module.exports = School;