require('dotenv').config();
const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
const Snippet = require('./models/Snippet');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/syntaxflow';

async function seed() {
  await mongoose.connect(MONGO_URI, { dbName: 'syntaxflow' });
  console.log('Connected to MongoDB for seeding');

  await Quiz.deleteMany({});
  await Snippet.deleteMany({});

  const langs = ['C', 'C++', 'Python', 'Java', 'JavaScript'];

  const quizzes = langs.map((lang) => ({
    title: `${lang} Basics Quiz`,
    language: lang,
    questions: [
      {
        prompt: `What is the file extension commonly used for ${lang} source files?`,
        options: ['.txt', '.code', '.src', lang === 'C++' ? '.cpp' : lang === 'C' ? '.c' : lang === 'Java' ? '.java' : lang === 'Python' ? '.py' : '.js'],
        correctIndex: 3
      },
      {
        prompt: `Is ${lang} statically typed?`,
        options: ['Yes', 'No'],
        correctIndex: lang === 'Python' || lang === 'JavaScript' ? 1 : 0
      }
    ]
  }));

  await Quiz.insertMany(quizzes);
  console.log('Inserted sample quizzes');

  await Snippet.insertMany([
    {
      title: 'Two Sum in JavaScript',
      language: 'JavaScript',
      code: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
      description: 'Classic two-sum solution using a hashmap',
      author: 'anonymous',
      likes: 2
    },
    {
      title: 'Fibonacci in Python',
      language: 'Python',
      code: `def fib(n):\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a` ,
      description: 'Iterative Fibonacci sequence function',
      author: 'anonymous',
      likes: 1
    }
  ]);
  console.log('Inserted sample snippets');

  await mongoose.disconnect();
  console.log('Seed completed');
}

seed().catch((err) => {
  console.error('Seed failed', err);
  process.exit(1);
});
