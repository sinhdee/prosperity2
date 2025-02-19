const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const addUserToViews = require('./middleware/addUserToViews.js');
const isSignedIn = require('./middleware/isSignedIn.js');
require('dotenv').config();
require('./config/database.js');
const todoRoutes = require('./routes/todo');
const resourcesRouter = require('./routes/resources');

const applicationsController = require('./controllers/applications.js');
const authController = require('./controllers/auth.js');
const interviewsRouter = require('./routes/interviews.js');
const app = express();

app.set('views', './views')
app.set('view engine','ejs');



const port = process.env.PORT ? process.env.PORT : '3000';

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

app.use(morgan('dev'));

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

app.use(addUserToViews);
app.use(todoRoutes)
app.use((req,res,next) =>{
  res.locals.uploadedFiles ={};
  next();
});

app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect(`/users/${req.session.user._id}/applications`);
  } else {
    res.render('index.ejs');
  }
});

app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/applications', applicationsController);
app.use('/users/:userId/interviews', interviewsRouter);
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});

app.use('/', resourcesRouter)

