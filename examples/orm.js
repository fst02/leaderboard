const Sequelize = require('sequelize');

const sequelize = new Sequelize('leaderboard', 'student', 'braininghub', {
  host: 'localhost',
  dialect: 'mysql',
});

const foo = async () => {
  const Student = sequelize.define('students', {
    name: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.INTEGER,
    },
  });
  await Student.sync({ force: true });
  await Student.create({
    name: 'Géza',
    age: 70,
  });

  const students = await Student.findAll();
  students.forEach(student => console.log({ id: student.id, name: student.name, age: student.age }));
};

foo();
