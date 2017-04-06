var db = openDatabase('testdb', '1.0', 'test database', 2 * 1024 * 1024);
console.log('does my db exist?', db);

if (db) {
	db.transaction(function(tx) {
	  tx.executeSql('CREATE TABLE IF NOT EXISTS foo (id unique, meta_data)');
	  tx.executeSql('INSERT INTO foo (id, meta_data) VALUES (1, "foobar")');
	});

	db.transaction(function(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS bar (date, id)');
		tx.executeSql('INSERT INTO bar (date, id) VALUES (123, 1)');
	});

	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM foo WHERE id = 1', [], function(tx, results) {
			console.log('results from query 1:', results);
			tx.executeSql('SELECT * FROM bar WHERE date = 123', [], function(tx, results) {
				console.log('results from query 2:', results);
			}, function(tx, error) {
				console.log('is there an error w/ query 2?', error);
			});
		});

		tx.executeSql('SELECT * FROM bar WHERE id = 1', [], function(tx, results) {
			console.log('results from query 3:', results);
		});
	});
}
