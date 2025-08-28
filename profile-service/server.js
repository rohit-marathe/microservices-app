const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Profile Service Running', service: 'profile', timestamp: new Date().toISOString() });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'profile' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Profile service running on port ${PORT}`);
});
