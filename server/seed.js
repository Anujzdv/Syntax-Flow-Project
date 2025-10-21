require('dotenv').config();
const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
const Snippet = require('./models/Snippet');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/syntaxflow';

async function seed() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');

  await Quiz.deleteMany({});
  await Snippet.deleteMany({});

  const languages = ['C', 'C++', 'Python', 'Java', 'JavaScript'];
  const quizzes = languages.map((lang) => ({
    title: `${lang} Basics Quiz`,
    language: lang,
    questions: [
      {
        prompt: `What is ${lang}?`,
        options: ['Programming language', 'Database', 'Web server', 'Framework'],
        correctIndex: 0,
      },
      {
        prompt: `Is ${lang} statically typed?`,
        options: ['Yes', 'No', 'Depends', 'Unknown'],
        correctIndex: lang === 'Python' || lang === 'JavaScript' ? 1 : 0,
      },
    ],
  }));

  await Quiz.insertMany(quizzes);
  console.log('Inserted sample quizzes');

  await Snippet.insertMany([
    {
      title: 'Hello World in JavaScript',
      language: 'JavaScript',
      code: "console.log('Hello, World!');",
      author: 'Alice',
      likes: 3,
    },
    {
      title: 'Python List Comprehension',
      language: 'Python',
      code: '[x*x for x in range(10)]',
      author: 'Bob',
      likes: 5,
    },
  ]);
  console.log('Inserted sample snippets');

  await mongoose.disconnect();
  console.log('Done');
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
