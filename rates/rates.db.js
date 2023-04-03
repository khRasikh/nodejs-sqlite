const sqlite3 = require('sqlite3');
sqlite3.verbose();
const DBSOURCE = './tmp/rates.db.sqlite';

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log('Connected to the SQLite database.');
    //CREATE rate TABLE
    db.run(
      `CREATE TABLE rate (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            BASE_CODE text, 
            USD FLOAT NOT NULL, 
            EUR FLOAT NOT NULL, 
            GBP FLOAT NOT NULL, 
            CNY FLOAT NOT NULL, 
            created_at text UNIQE,
            updated_at text UNIQE,
            CONSTRAINT created_at UNIQUE (created_at),
            CONSTRAINT updated_at UNIQUE (updated_at)
            )`,
      (err) => {
        if (err) {
          console.error('rate Table already created');
        } else {
          console.error('Table rate just created');
        }
      }
    );
  }
});

module.exports = db;
