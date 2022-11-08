const db = require('../config/connection');
const { User, Tag } = require('../models');
const userSeeds = require('./userSeeds.json');
const tagSeeds = require('./tagSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    
    await Tag.create(tagSeeds);

    await User.create(userSeeds);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
