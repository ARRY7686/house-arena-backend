// server.js
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

// connectDB();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
app.get('/', (req, res) => {
    res.send('API is running...');
});