// server.js
const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

// dotenv.config();

// // connectDB();

// const app = express();

// app.use(express.json());

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port http://localhost:${PORT}`);
// });
// app.get('/', (req, res) => {
//     res.send('API is running...');
// });

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB Connected');
}).catch((err) => {
  console.log(err);
})

const app = express();

app.use(express.json());

app.listen(5000, () => {
  console.log('Server running on port 5000');
});