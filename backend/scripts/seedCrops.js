import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../src/models/User.js';
import Crop from '../src/models/Crop.js';

dotenv.config();

const seedFarmerEmail = 'seedfarmer@example.com';

const sampleCrops = [
  { name: 'Wheat - Bansi', price: 1200, quantity: 200, image: 'wheat.jpeg', description: 'High-yield winter wheat.' },
  { name: 'Paddy - IR64', price: 900, quantity: 250, image: 'rice.jpeg', description: 'Reliable paddy for irrigated fields.' },
  { name: 'Maize - Sweet', price: 800, quantity: 180, image: 'maize.jpeg', description: 'Sweet corn variety for fresh market.' },
  { name: 'Cotton - Bt', price: 1500, quantity: 120, image: 'cotton.jpeg', description: 'Bt cotton for pest resistance.' },
  { name: 'Mirchi - Red', price: 3200, quantity: 60, image: 'mirchi.jpeg', description: 'Hot red chilies.' },
  { name: 'Sugarcane', price: 600, quantity: 500, image: 'sugar cane.jpeg', description: 'Sugarcane for sugar mills.' },
  { name: 'Castor', price: 700, quantity: 140, image: 'castor.jpeg', description: 'Oilseed castor crop.' },
  { name: 'Sunflower', price: 950, quantity: 110, image: 'sunflower.jpeg', description: 'Sunflower for oilseed market.' },
  { name: 'Barley', price: 650, quantity: 90, image: 'barley.jpeg', description: 'Barley for feed and malting.' },
  { name: 'Sesame', price: 2200, quantity: 45, image: 'sesame.jpeg', description: 'High-value sesame seeds.' },
];

const run = async () => {
  if (!process.env.MONGO_URI) {
    console.error('❌ MONGO_URI is not set in .env. Set it and re-run.');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    let farmer = await User.findOne({ email: seedFarmerEmail });
    if (!farmer) {
      const hashed = await bcrypt.hash('seedfarmer123', 10);
      farmer = new User({ fullName: 'Seed Farmer', email: seedFarmerEmail, password: hashed, role: 'farmer', verified: true });
      await farmer.save();
      console.log('✅ Seed farmer created:', seedFarmerEmail);
    } else {
      console.log('ℹ️ Seed farmer already exists:', seedFarmerEmail);
    }

    // Insert crops if they don't already exist (by name)
    for (const c of sampleCrops) {
      const exists = await Crop.findOne({ name: c.name, farmer: farmer._id });
      if (exists) {
        console.log('ℹ️ Crop exists, skipping:', c.name);
        continue;
      }

      const crop = new Crop({
        farmer: farmer._id,
        name: c.name,
        description: c.description,
        price: c.price,
        quantity: c.quantity,
        image: c.image,
        status: 'Active',
      });

      await crop.save();
      console.log('✅ Seeded crop:', c.name);
    }

    console.log('🎉 Seeding complete.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

run();
