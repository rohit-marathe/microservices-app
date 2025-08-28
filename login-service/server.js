const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Login Service Running', service: 'login', timestamp: new Date().toISOString() });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'login' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Login service running on port ${PORT}`);
});
