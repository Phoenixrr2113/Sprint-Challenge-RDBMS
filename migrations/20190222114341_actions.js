exports.up = function(knex, Promise) {
	return knex.schema.createTable('actions', table => {
		table.increments();

		table.string('description', 255).notNullable();

		table.string('comment', 255);

		table.boolean('completed').notNullable();

		table.timestamps(true, true);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('actions');
};
