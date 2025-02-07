const express = require('express');
const router = express.Router();
const Todo = require ('../models/todo')

// //all todos
// router.get('/todos', async (req,res) =>{
//     try{
//         const todos = await Todo.find();
//         res.render('todo-list')
//     }catch (err) {
//         res.status(500).json("error")
//     }
// });

//show todo form
router.get('/add-todo', async (req,res) =>{
        res.render('todo-list/new');
});

//form submission 
router.post('/todos', async (req,res) => {
    try {
        const {name, completed} = req.body;

        const newTodo = new Todo({
            name: name,
            completed: completed === 'on'
        });
        await newTodo.save();

        res.redirect('/users/${userId}/interviews');
    }catch (error) {
        console.error(error);
        res.status(500).send('error')
    }
});

router.get('/todos', async (req,res)=>{
    try{
        const todos = await Todo.find();
        res.render('todo-list/todo-list', {todos});
    }catch {
        console.error(error)
        res.status(500).send('error loading list');
    }
});

module.exports = router;