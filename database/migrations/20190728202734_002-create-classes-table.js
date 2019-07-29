exports.up = function(knex) {
	return knex.schema.createTable('classes', (tbl) => {
		tbl.increments();

    tbl.string('name', 128).notNullable();
		tbl
			.integer('teacher_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('teachers')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
    tbl.string('theme', 128);
    tbl.integer('timer');
    tbl.integer('threshold');
    tbl.integer('sensitivity');
    tbl.timestamp('streakSince');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('classes');
};
