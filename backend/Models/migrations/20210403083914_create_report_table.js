const knex = require("knex");

exports.up = function (knex, Promise) {
  return knex.schema.createTable("report", (table) => {
    table
      .specificType("reportId", "int(11) AUTO_INCREMENT primary key")
      .notNullable();
    table.integer("roomId").notNullable();
    table.integer("userId").notNullable();
    table.string("category", 100).notNullable();
    table.date("date").notNullable();
    table.string("description", 1000).notNullable();
    table.boolean("isHandled").notNullable();
    table.string("answer", 1000).notNullable();
    table.foreign("userId").references("account.userId");
    //table.foreign("roomId").references("room.roomId");
  });
};

exports.down = function (knex, Promise) {
  knex.schema.dropTable("report");
};
