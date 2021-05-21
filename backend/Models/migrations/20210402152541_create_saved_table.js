exports.up = function (knex, Promise) {
    return knex.schema.createTable("saved", (table) => {
      table.integer("userId").notNullable();
      table.integer("roomId").notNullable();
      table.primary(["userId", "roomId"]);
      table.foreign("userId").references("account.userId");
    });


};

exports.down = function (knex, Promise) {
  knex.schema.dropTable("saved");
};
