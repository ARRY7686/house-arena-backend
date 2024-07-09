const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const houseRoutes = require('./routes/houseRoutes');
const eventRoutes = require('./routes/eventRoutes');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/houses', houseRoutes);
app.use('/api/events', eventRoutes);

app.use(errorHandler);

module.exports = app;
