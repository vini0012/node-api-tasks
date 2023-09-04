exports.up = function (knex) {
    return knex.schema.createTable('tasks', function (table) {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.boolean('completed').defaultTo(false);
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('tasks');
};
