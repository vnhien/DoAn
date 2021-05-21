const knex = require("knex");

exports.up = function(knex, promise) {
  return knex.schema.createTable('account', table =>{
      table.specificType('userId', 'int(11) AUTO_INCREMENT primary key').notNullable();
      table.string('username', 100).notNullable();
      table.string('password', 256).notNullable();
      table.string('fullname', 150).notNullable();
      table.date("date").notNullable();
      table.date('birthday').notNullable();
      table.string('address', 1000).notNullable();
      table.string('phone', 12).notNullable();
      table.string('email',120).notNullable();
      table.string('job', 100).notNullable();
      table.string('introduction', 1000).notNullable().defaultTo('');
      table.string('acctype', 50).notNullable().defaultTo('Người thuê trọ');
      table.unique('username');
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('account');
};
