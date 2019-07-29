exports.up = function(knex) {
	return knex.schema.createTable('scores', (tbl) => {
		tbl.increments();

		tbl
			.integer('class_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('classes')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');

		tbl.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

		tbl.integer('score').notNullable();
    tbl.boolean('streak').notNullable();
		tbl.string('theme');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('scores');
};