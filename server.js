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
const uploadMiddleware = require("./middleware/uploadMiddleware.js");
const upload = require("./config/multer.js"); // Import Multer

// Controllers
const applicationsController = require('./controllers/applications.js');
const authController = require('./controllers/auth.js');
const interviewsRouter = require('./routes/interviews.js');
const app = express();

app.set('views', './views')
app.set('view engine','ejs');


// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : '3000';

// MIDDLEWARE

// Middleware to parse URL-encoded data from forms
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

// Public Routes

app.get('/', (req, res) => {
  // Check if the user is signed in
  if (req.session.user) {
    // Redirect signed-in users to their applications index
    res.redirect(`/users/${req.session.user._id}/applications`);
  } else {
    // Show the homepage for users who are not signed in
    res.render('index.ejs');
  }
});

// Protected Routes
app.use(isSignedIn);

app.use('/auth', authController);
app.use('/users/:userId/applications', applicationsController);
app.use('/users/:userId/interviews', interviewsRouter);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`The express app is ready on port ${port}!`);
});

app.use('/', resourcesRouter)
