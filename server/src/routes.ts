import express from 'express';
import pool from './db';

const routes = express.Router();

// Add
routes.post('/todos', async(req, res) => {
    try {
        const {description} = req.body;
        const newTodo = await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *', [description]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all
routes.get('/todos', async(req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM todo');
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//Get a todo
routes.get('/todos/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Update
routes.put('/todos/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [description, id]);
        res.json('Updated');
    } catch (err) {
        console.error(err.message);
    }
});

//Delete
routes.delete('/todos/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);
        res.json('Deleted');
    } catch (err) {
        console.error(err.message);
    }
});

export default routes;