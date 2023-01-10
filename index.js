const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/buy-tshirt', (req, res) => {
    res.render('buy-tshirt')
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Serving at port ${port}`)
});