const mongoose = require('mongoose');

// Membuat cetakan (Schema) untuk data To-Do
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true // 'title' harus selalu ada
  },
  description: {
    type: String,
    required: false // 'description' boleh kosong
  },
  completed: {
    type: Boolean,
    default: false // Nilai default-nya adalah 'false' saat dibuat
  }
}, {
  timestamps: true // Otomatis menambahkan field 'createdAt' dan 'updatedAt'
});

// Membuat model dari cetakan di atas
// 'Todo' akan menjadi nama collection 'todos' di MongoDB
const Todo = mongoose.model('Todo', todoSchema);

// Export model agar bisa digunakan di file lain
module.exports = Todo;