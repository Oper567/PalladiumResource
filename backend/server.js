const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
// UPDATED: Destructure connectDB because we now export { connectDB, db, auth }
const { connectDB } = require('./config/db'); 
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');

// 1. Configuration
dotenv.config();
connectDB(); // Now initializes Firebase Admin SDK

const app = express();

// 2. Middleware
app.use(cors());

// IMPORTANT: Stripe Webhook raw body parser
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));

// Standard JSON Parser
app.use(express.json());

// 3. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

// 4. Production Setup
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('Palladium API is running with Firebase...');
  });
}

// 5. Error Handling
app.use(notFound);
app.use(errorHandler);

// 6. Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
