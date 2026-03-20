const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    const adminExists = await User.findOne({ username: 'admin0' });
    if (adminExists) {
      console.log('Admin user admin0 already exists!');
      process.exit();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@123', salt);

    const adminUser = new User({
      username: 'admin0',
      password: hashedPassword,
      role: 'admin'
    });

    await adminUser.save();
    console.log('Admin user admin0 created successfully with password Admin@123!');
    process.exit();
  } catch (err) {
    console.error('Error seeding admin user:', err);
    process.exit(1);
  }
};

seedAdmin();
