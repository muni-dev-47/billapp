const connectDB = require('./config/mondb');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

// Allow requests from your React frontend
app.use(cors({
  origin: '*', // or '*' for all (not recommended in production)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

const customerRoutes = require('./routes/customerRoute');
const billRoutes = require('./routes/billRoutes');
const creditRoutes = require('./routes/creditHistoryRoutes');
const transactionRoutes = require('./routes/transactionHistoryRoutes');

app.use('/api/customers', customerRoutes);
app.use('/api/bill', billRoutes);
app.use('/api/credits', creditRoutes);
app.use('/api/transactions', transactionRoutes);

connectDB();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
