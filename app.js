const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/Blog');
const lodash = require('lodash');
const router = express.Router();

const app = express();
// DB connection(mangoDB)
const dbURI = 'mongodb+srv://test123:test123@blog0.pgjd2eb.mongodb.node-class1/?retryWrites=true&w=majority';
async function connect() {
  try {
    await mongoose.connect('dbURI');
  } catch (err) {
    console.log(err);
  }
}
connect();
//mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
//app().then((result) => console.log('connected to db'));
//app().catch((err) => console.log(err));
//view engine
app.set('view engine', 'ejs');
app.listen(3000);

// middleware and static files
app.use(express.static('public'));
app.use(morgan('dev'));

//db at play
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog',
  });
  save();
  then(result => {
    res.send(result);
  });
  blog.catch(err => {
    console.log(err);
  });
});

app.get('/', (req, res) => {
	//res.send('<p> Home Page </p>');
	res.render('index', { title: 'Home' });
});

app.get('/about', (req, res) => {
	//res.send('<p> Home Page </p>');
	res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
	res.render('create', { title: 'Create a new blog' });
});

//404
app.use((req, res) => {
	res.status(404).render('404', { title: '404' });
});
