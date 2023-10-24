const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/Blog');

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
/*mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true });
.then(result => app.listen(3000));
.catch(err => console.log(err));*/

//view engine
app.set('view engine', 'ejs');
app.listen(3000);

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//Routs
app.get('/', (req, res) => {
  res.redirect('/blogs');
  //res.send('<p> Home Page </p>');
  //res.render('index', { title: 'Home' });
});

app.get('/about', (req, res) => {
  //res.send('<p> Home Page </p>');
  res.render('about', { title: 'About' });
});

//Blog rout
app.get('/blogs', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { title: 'All Blogs', Blogs: result });
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/blogs/create', (req, res) => {
	res.render('create', { title: 'Create a new blog' });
});

//404
app.use((req, res) => {
	res.status(404).render('404', { title: '404' });
});
