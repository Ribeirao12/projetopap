const express = require('express');
const app = express();
const path = require('path');
const exphbs  = require('express-handlebars');
const request = require('request');
const bodyParser = require('body-parser');
const PORTA = process.env.PORTA || 5000;



//usar o body parser 
app.use(bodyParser.urlencoded({extended: false}));




// chave API pk_39505e278dd7448f88c6093a46b807de
// chamar a API
function call_api(finishedAPI, ticker) {
request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_39505e278dd7448f88c6093a46b807de', { json: true }, (err, res, body) => {
	if(err) {return console.log(err);}
	if (res.statusCode === 200){
		//console.log(body);
		finishedAPI(body);
		};
	});
};

//colocar handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//criar um caminho para a pagina sobre
app.get('/about.html', function (req, res) {
    res.render('home', {});
});
// criar um caminho para a pagina home index GET
app.get('/', function (req, res) {
	call_api(function(doneAPI) {
			res.render('home', {
    		stock: doneAPI
    	});	
	},"fb");
 });

// criar um caminho para a handlebar index POST
app.post('/', function (req, res) {
	call_api(function(doneAPI) {
			//posted_stuff = req.body.stock_ticker;
			res.render('home', {
    		stock: doneAPI,
    	});	
	}, req.body.stock_ticker);

 });




//criar uma pasta estática
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORTA, () => console.log('Site hospedado na porta ' + PORTA))
