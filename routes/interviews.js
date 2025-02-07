const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Todo = require('../models/todo.js')
const app = express()

router.get('/', async (req,res) => {
    try{
        const users = await User.find({'applications.status': 'interviewing'});
        const todos = await Todo.find();

        const interviews = users.flatMap(user =>
             user.applications.filter(app => app.status === 'interviewing' || 'accepted' || 'rejected')
        );
        if (interviews.length === 0) {
            return res.status(400).send('no interviews');
        }
        res.render('interviews/index',{applications: interviews, todos: todos});

    } catch (error){
        console.error(error);
        res.status(500).send('error fetching interviews')
    }
});

router.post('/todos', async (req,res) => {
    try{
        const newTodo = await Todo.create(req.body);
        res.redirect('/todo');
    } catch (error) {
        console.log(error)
        res.send(error);
    }
});
module.exports = router;