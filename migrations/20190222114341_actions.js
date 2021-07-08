exports.up = function(knex, Promise) {
	return knex.schema.createTable('actions', table => {
		table.increments();

		table.string('description', 255).notNullable();

		table.string('comment', 255);

		table
			.integer('project_id')
			.notNullable()
			.unsigned()
			.references('id')
			.inTable('projects')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');

		table.boolean('completed').notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('actions');
};
