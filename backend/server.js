require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/devops-db';

app.use(cors());
app.use(express.json());

// Models
const Item = require('./models/Item');


// Database connection
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Version API
app.get('/version', (req, res) => {
  res.json({ version: '1.0.0', stage: 'production' });
});

// About API (Profiles) GET
app.get('/about', async (req, res) => {
  try {
    const profile = await Item.findOne({ isProfile: true });
    if (profile) {
      const descParts = profile.description.split(' - ');
      res.json({
        student: {
          name: profile.name,
          id: descParts[0]?.replace('MSSV: ', '') || '',
          class: descParts[1]?.replace('Lớp: ', '').replace(' (Lấy từ MongoDB Env)', '') || ''
        },
        appName: process.env.APP_NAME || 'Backend App'
      });
    } else {
      res.json({ student: null, appName: process.env.APP_NAME || 'Backend App' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// About API (Profiles) POST
app.post('/about', async (req, res) => {
  try {
    let profile = await Item.findOne({ isProfile: true });
    const newDescription = `MSSV: ${req.body.id} - Lớp: ${req.body.class}`;
    if (profile) {
      profile.name = req.body.name;
      profile.description = newDescription;
      await profile.save();
    } else {
      profile = new Item({
        name: req.body.name,
        description: newDescription,
        isProfile: true
      });
      await profile.save();
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Items API (GET)
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Items API (POST)
app.post('/api/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
