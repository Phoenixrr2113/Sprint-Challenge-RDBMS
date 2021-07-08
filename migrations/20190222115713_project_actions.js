exports.up = function(knex, Promise) {
	return knex.schema.createTable('project_actions', table => {
		table.increments();

		table
			.integer('action_id')
			.notNullable()
			.unsigned()
			.references('id')
			.inTable('actions')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');

		table
			.integer('project_id')
			.unsigned()
			.references('id')
			.inTable('projects')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('project_actions');
};
