const express = require('express');
const router = express.Router();

// Import controller
const { 
  createTodo, 
  getAllTodos, 
  getTodoById,
  updateTodo,
  deleteTodo,  
} = require('../controllers/todoController');

// Definisikan routes
router.post('/', createTodo);
router.get('/', getAllTodos);
router.get('/:id', getTodoById); 
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;