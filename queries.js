
const dotenv = require('dotenv');
dotenv.config();
const User  = require('./models/user.js')
const mongoose = require('mongoose');
const Todo = require('./models/todo.js');

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
  await runQueries();

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
  process.exit();
};

connect();


const createTodo = async () => {
  const todoData = {
    text: 'learn React',
    isComplete: false,
  };
  const todo = await Todo.create(todoData);
  console.log('New todo:', todo);
};

const findTodos = async () => {
    const todos = await Todo.find({}).populate("assignee");
    console.log("All todos:", todos);
  };
  

const createUser = async () => {
    const userData = {
      name: "Alex",
      email: "alex@mail.com",
    };
    const user = await User.create(userData);
    console.log("New user:", user);
  };
  const assignTodo = async () => {
    const todoId = '657b25adc8146427465857d7';
    const userId = '6581d503b8b46a5314295d66';
  
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { assignee: userId },
      { new: true }
    );
  
    console.log('Updated document:', updatedTodo);
  };
  

const runQueries = async () => {
  console.log('Queries running.');
  await createTodo(), createUser(),assignTodo(),findTodos();
};

