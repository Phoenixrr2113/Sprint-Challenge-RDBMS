exports.up = function(knex, Promise) {
	return knex.schema.createTable('projects', table => {
		table.increments();

		table
			.string('name', 128)
			.notNullable()
			.unique();

		table.string('description', 255).notNullable();

		table.boolean('completed').notNullable();

		table.timestamps(true, true);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('projects');
};
