const connection = require('../config/connection');
const { Thought, User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // Create empty array to hold the users
  const users = [
    {
      username: "lernantino",
      email: "lernantino@gmail.com",
    },
    {
      username: "lancedragon",
      email: "lancedragon@gmail.com",
    },
    {
      username: "kayanderson123",
      email: "kayanderson@gmail.com"
    },
    {
      username: "rextbrown",
      email: "rextbrown@gmail.com"
    }
  ];

  const thoughts = [
    {
      thoughtText: 'Be kind to yourself',
      username: 'lernantino',
    },
    {
      thoughtText: 'Feeling a bit negative so time to relax and take a break',
      username: 'lernantino',
    },
    {
      thoughtText: 'Remember to take breaks',
      username: 'lancedragon',
    },
    {
      thoughtText: 'Best way to avoid burnout is to take a walk and step away from everything',
      username: 'lernantino',
    },
    {
      thoughtText: 'Thoughts are the words of our minds',
      username: 'rextbrown',
    },
  ];


  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Add thoughts to the collection and await the results
  await Thought.collection.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  // console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
