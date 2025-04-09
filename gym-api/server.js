const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/customers', require('./routes/customers'));
app.use('/api/packages', require('./routes/packages'));
app.use('/api/schedules', require('./routes/schedules'));
app.use('/api/auth', require('./routes/auth')); // Thêm route auth

// Route mặc định
app.get('/', (req, res) => {
  res.send('Chào mừng đến với Gym API! Các endpoint có sẵn: /api/customers, /api/packages, /api/schedules, /api/auth');
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server đang chạy trên cổng ${PORT}`));