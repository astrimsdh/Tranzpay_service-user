'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
      nama_usaha: 'Tranzpay',
      nama_pemilik: 'Bayu Ahmad Nizar',
      role: 'admin',
      no_hp: '085876239181',
      email: 'admin@gmail.com',
      password: await bcrypt.hash('password', 10),
      pin: await bcrypt.hash('1111', 10),
      saldo: 0,
      created_at: new Date(),
      updated_at: new Date()
      }, 
      {
        nama_usaha: 'Acil CELL',
        nama_pemilik: 'Astri Musidah',
        role: 'member',
        no_hp: '081214672990',
        email: 'astry.musidah@gmail.com',
        password: await bcrypt.hash('password', 10),
        pin: await bcrypt.hash('1111', 10),
        saldo: 0,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
