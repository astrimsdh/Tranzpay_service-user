'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       primaryKey: true,
       allowNull: false
      },
      nama_usaha: {
       type: Sequelize.STRING,
       allowNull: false
      },
      nama_pemilik: {
        type: Sequelize.STRING,
        allowNull: false
       },
      alamat: {
       type: Sequelize.STRING,
       allowNull: true
      },
      avatar: {
       type: Sequelize.STRING,
       allowNull: true
      },
      role: {
       type: Sequelize.ENUM,
       values: ['admin', 'member'],
       allowNull: false
      },
      no_hp: {
        type: Sequelize.STRING,
        allowNull: false
       },
      email: {
       type: Sequelize.STRING,
       allowNull: false
      },
      password: {
       type: Sequelize.STRING,
       allowNull: false
      },
      pin: {
        type: Sequelize.STRING,
        allowNull: false
       },
      saldo: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
       type: Sequelize.DATE,
       allowNull: false
      },
      updated_at: {
       type: Sequelize.DATE,
       allowNull: false
      }
     });

     await queryInterface.addConstraint('users', {
       type: 'unique',
       fields: ['email'],
       name: 'UNIQUE_USERS_EMAIL'
     });
     await queryInterface.addConstraint('users', {
      type: 'unique',
      fields: ['no_hp'],
      name: 'UNIQUE_USERS_NO_HP'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
