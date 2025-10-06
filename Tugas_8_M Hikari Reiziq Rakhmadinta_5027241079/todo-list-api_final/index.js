// 1. Import library yang dibutuhkan
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Panggil dotenv.config() di paling atas
const todoRoutes = require('./routes/todoRoutes');

// 2. Inisialisasi aplikasi express
const app = express();
// Ambil port dari file .env atau gunakan 3000 jika tidak ada
const PORT = process.env.PORT || 3000; 

// 3. Middleware
app.use(express.json());

// 4. Fungsi untuk koneksi ke MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Successfully connected to MongoDB!');
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1); // Keluar dari proses jika koneksi gagal
  }
};

// Panggil fungsi koneksi
connectDB();

// 5. Membuat route sederhana
app.get('/', (req, res) => {
  res.send('<h1>Selamat Datang di To-Do List API!</h1>');
});

app.use('/api/todos', todoRoutes);

// 6. Menjalankan server
app.listen(PORT, () => {
  console.log(`Server is running successfully on http://localhost:${PORT}`);
});