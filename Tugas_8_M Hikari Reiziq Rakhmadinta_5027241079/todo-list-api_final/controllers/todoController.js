const Todo = require('../models/Todo'); // Import model Todo

// @desc    Membuat item to-do baru
// @route   POST /api/todos
// @access  Public
const createTodo = async (req, res) => {
  try {
    // Ambil title dan description dari body request
    const { title, description } = req.body;

    // Validasi sederhana: pastikan title tidak kosong
    if (!title) {
      return res.status(400).json({ message: 'Title tidak boleh kosong' });
    }

    // Buat item to-do baru di database
    const newTodo = await Todo.create({
      title,
      description,
    });

    // Kirim respons sukses dengan status 201 (Created)
    res.status(201).json(newTodo);

  } catch (error) {
    // Kirim respons error jika terjadi masalah di server
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mendapatkan semua item to-do
// @route   GET /api/todos
// @access  Public
const getAllTodos = async (req, res) => {
  try {
    // Cari semua dokumen di collection 'todos'
    const todos = await Todo.find({});
    
    // Kirim respons dengan data yang ditemukan
    res.status(200).json(todos);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Mendapatkan satu item to-do berdasarkan ID
// @route   GET /api/todos/:id
// @access  Public
const getTodoById = async (req, res) => {
  try {
    // Ambil ID dari parameter URL
    const { id } = req.params;
    
    // Cari to-do di database berdasarkan ID
    const todo = await Todo.findById(id);

    // Jika to-do tidak ditemukan, kirim error 404
    if (!todo) {
      return res.status(404).json({ message: 'Item to-do tidak ditemukan' });
    }

    // Jika ditemukan, kirim datanya
    res.status(200).json(todo);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    
    const updatedTodo = await Todo.findByIdAndUpdate(
      id, // ID item yang akan diupdate
      req.body, // Data baru dari body request
      { new: true, runValidators: true } // Opsi
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Item to-do tidak ditemukan' });
    }

    res.status(200).json(updatedTodo);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Item to-do tidak ditemukan' });
    }

    res.status(200).json({ message: 'Item to-do berhasil dihapus' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tambahkan fungsi terakhir ini ke exports
module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo, // <-- TAMBAHKAN INI
};