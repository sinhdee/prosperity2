const express = require('express');
const router = express.Router();
const Todo = require ('../models/todo')

router.get('/add-todo', async (req,res) =>{
        res.render('todo-list/new')
});

router.post('/todos', async (req,res) => {
    try {
        const {name, completed} = req.body

        const newTodo = new Todo({
            name: name,
            completed: completed === 'on'
        });
        await newTodo.save();

        res.redirect('/users/${userId}/interviews')
    }catch (error) {
        console.error(error);
        res.status(500).send('error')
    }
});

router.get('/todos', async (req,res)=>{
    try{
        const todos = await Todo.find()
        res.render('todo-list/todo-list', {todos})
    }catch {
        console.error(error)
        res.status(500).send('error loading list')
    }
});
 router.delete('/todos/:id', async (req,res) =>{
    try{
        const todoId = req.params.id
        await Todo.findByIdAndDelete(todoId)
        res.redirect('/todos')
    } catch (error){
        console.error(error);
        res.status(500).send('error deleting the todo')
    }
 });

 router.put('/todos/:id', async (req,res) => {
    try{
        const todoId = req.params.id
        const completed = req.body.completed === 'on'

        await Todo.findByIdAndUpdate(todoId, {completed})
        res.redirect('/todos')
    } catch (error){
        console.error(500).send('Error in updating the to-do')
    }
 });

 router.get('/todos/edit/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        res.render('todo-list/edit', { todo: todo });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching todo');
    }
 });
 module.exports = router;
 