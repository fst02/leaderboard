const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'student',
  password: 'braininghub',
  database: 'leaderboard',
});

const req = {
  name: 'Új Ubul',
  age: 1,
};

connection.execute(
  'INSERT INTO `people` VALUES (?, ?)',
  [req.name, req.age],
  (error, results, fields) => {
    // console.error(error);
    // console.log(results);
    // console.log(fields);
    connection.query(
      'SELECT * FROM `people`',
      (error, results, fields) => {
        // console.error(error);
        console.log(results);
        // console.log(fields);
      },
    );
  },
);
