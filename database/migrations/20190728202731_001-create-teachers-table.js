exports.up = function(knex) {
	return knex.schema.createTable('teachers', (tbl) => {
		tbl.increments();

		tbl.string('username', 128).notNullable().unique();
		tbl.string('password', 255).notNullable();
		tbl.string('email', 128).notNullable().unique();
		tbl.string('firstName', 128).notNullable();
    tbl.string('lastName', 128).notNullable();
    tbl.string('title', 128); // Mr., Miss, Mrs., etc.
    tbl.string('theme', 128);
    tbl.text('intake');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('teachers');
};
