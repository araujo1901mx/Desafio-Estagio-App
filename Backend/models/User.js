const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
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
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            {
                sequelize,
                modelName: 'User',
                tableName: 'users',
                underscored: true,
                hooks: {
                    beforeSave: async (user) => {
                        if (user.changed('password')) {
                            user.password = await bcrypt.hash(user.password, 10);
                        }
                    }
                }
            }
        );
    }
}

module.exports = User;