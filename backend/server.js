require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const connectToMongoDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const incomeRoutes = require('./routes/income.routes');
const expenseRoutes = require('./routes/expense.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

// PORT initialization
const PORT = process.env.PORT || 5000;

// App initialization
const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// API route
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/income', incomeRoutes);
app.use('/api/v1/expense', expenseRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

// Not required for main app
// Purpose: Only to ping server from cron job app to prevent cold start in hosting service render.com
app.use('/ping', (req, res) => {
  res.status(200).json({ success: true, message: 'Server awake' });
});

// Serve uploads folder
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server started at PORT ${PORT}`);
});
