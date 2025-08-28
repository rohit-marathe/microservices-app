const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Orders Service Running', service: 'orders', timestamp: new Date().toISOString() });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'orders' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Orders service running on port ${PORT}`);
});
