const express = require('express');
const app = express();
const path = require('path');
const exphbs  = require('express-handlebars');

const PORTA = process.env.PORTA || 5000;

//colocar handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// criar um caminho para as handlebars
app.get('/', function (req, res) {
    res.render('home', {
    	coisas: "coisas..."
    });
});

//criar uma pasta estática
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORTA, () => console.log('Site hospedado na porta ' + PORTA))
