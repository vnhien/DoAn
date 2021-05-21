const knex = require("knex");

exports.up = function (knex, Promise) {
  return knex.schema.createTable("room", (table) => {
    table
      .specificType("roomId", "int(11) AUTO_INCREMENT primary key")
      .notNullable();
    table.integer("houseId").notNullable();
    table.integer("userId").notNullable();
    table.foreign("userId").references("account.userId");
    table.string("name", 100).notNullable();
    table.date("date").notNullable();
    table.integer("price").notNullable();
    table.integer("size").notNullable();
    table.string("category", 100).notNullable();
    table.string("description", 1000).notNullable();
    table.string("status", 50).notNullable();
    table.string("image1", 200).nullable();
    table.string("image2", 200).nullable();
    table.string("image3", 200).nullable();
    table.string("image4", 200).nullable();
    table.string("image5", 200).nullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("room");
};
