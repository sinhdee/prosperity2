const express = require('express');
const router = express.Router();
const Todo = require ('../models/todo')

//show todo form
router.get('/add-todo', async (req,res) =>{
        res.render('todo-list/new')
});

//form submission 
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

//this shows the todo list 
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
        res.redirect('/users/${userId}/interviews')
    } catch (error){
        console.error(500).send('Error in updating the to-do')
    }
 });
module.exports = router;