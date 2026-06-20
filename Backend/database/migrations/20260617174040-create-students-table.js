'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('students', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      birthday: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      CPF: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      teacher_id: {
        type: Sequelize.UUID,
        references: { model: 'teachers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // Se deletar o professor, o aluno pode ficar sem professor temporariamente
        allowNull: true
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('students');
  }
};
