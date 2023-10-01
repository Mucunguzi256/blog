const express = require('express');
const morgan = require('morgan');

const app = express();

// view engine

app.set('view engine', 'ejs');
app.listen(3000);

// middleware and static files
app.use(express.static('public'));
app.use(morgan('dev'));

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
