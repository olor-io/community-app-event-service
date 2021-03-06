
exports.up = function(knex, Promise) {
    // Index columns are sortable in the API

    return knex.schema
    .createTableIfNotExists('user_events', function(table) {
        // Create user_events table
        table.increments('id').primary().index();
        table.string('user_id').notNullable().index();
        table.integer('event_id').notNullable().index();
        table.integer('distance').index();
        table.timestamp('created_at').index();
        table.timestamp('updated_at').index();
    })
    .createTableIfNotExists('events', function(table) {
        // Create table events
        table.increments('id').primary().index();
        table.string('name').notNullable().index();
        table.string('description').notNullable();
        table.dateTime('start_time').notNullable();
        table.integer('duration');
        table.integer('max_participants').notNullable();
        table.integer('cur_participants').notNullable();
        table.string('coordinates').notNullable().index();
        table.dateTime('review_deadline').notNullable();
        table.string('creator_id').notNullable().index();
        table.string('admin_id').notNullable().index();
        table.integer('chat_id').notNullable();
        table.integer('category_id').notNullable().index();
        table.timestamp('created_at').index();
        table.timestamp('updated_at').index();
    })
    .table('user_events', function(table) {
        // Add event_id foreign key after both tables are created
        table.foreign('event_id').references('id').inTable('events').onDelete('cascade');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('user_events')
    .dropTableIfExists('events');
};
