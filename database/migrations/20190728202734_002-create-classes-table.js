exports.up = function(knex) {
	return knex.schema.createTable('classes', (tbl) => {
		tbl.increments();

    tbl.string('name', 128).notNullable();
		tbl
			.integer('teacherId')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('teachers')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
    tbl.string('theme', 128);
    tbl.integer('timer').unsigned();
    tbl.integer('threshold').unsigned();
    tbl.integer('sensitivity');
    tbl.timestamp('streakSince').notNullable().defaultTo(knex.fn.now());
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('classes');
};
