const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from server!');
});

const db = require('./firebase');

app.post('/firestore-test', async (req, res) => {
  try {
    const docData = {
      hello: 'world',
      timestamp: new Date().toISOString()
    };

    const docRef = await db.collection('testCollection').add(docData);
    const snapshot = await docRef.get();

    res.json({ id: docRef.id, data: snapshot.data() });
  } catch (err) {
    console.error('Firestore error:', err);
    res.status(500).send('Failed to connect to Firestore');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
