require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/devops-db';

app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Models
const Item = require('./models/Item');

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Version API
app.get('/version', (req, res) => {
  res.json({ version: '1.0.0', stage: 'production' });
});

// About API
app.get('/about', (req, res) => {
  res.json({
    student: {
      name: '[Họ tên sinh viên]', // USER WILL FILL
      id: '[Mã số sinh viên]', // USER WILL FILL
      class: '[Lớp]' // USER WILL FILL
    },
    appName: process.env.APP_NAME || 'Backend App'
  });
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
