const knex = require("knex");

exports.up = function (knex, Promise) {
  return knex.schema.createTable("house", (table) => {
    table
      .specificType("houseId", "int(11) AUTO_INCREMENT primary key")
      .notNullable();
    table.integer("userId").notNullable();
    table.foreign("userId").references("account.userId");
    table.string("name", 256).notNullable();
    table.string("address", 500).notNullable();
    table.string("status", 100).notNullable();
    table.string("province", 150).notNullable();
    table.string("district", 150).notNullable();
    table.string("ward", 150).notNullable();
    table.string("description", 1000).notNullable();
    table.string("image", 200).notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("house");
};
