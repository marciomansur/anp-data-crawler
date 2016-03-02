var express     = require('express');
var config      = require('config');
var bodyParser 	= require('body-parser');

var crawler = require('./app/plugins/cities-crawler');

var app = express();
var port = process.env.PORT || 8080;

// Setting port
app.set('port', port);

// Setting Configurations
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.get('/', function(req, res){

    crawler()
        .then((data) => {

            res.json(data);
        })
        .catch((err) => {

            res.json(err);
        });
});

app.listen(app.get('port'), (err) =>{

    if(err)
        return console.log(`Error when initializing the server: ${err}`);

    console.log(`Server up, port: ${port}`);
});
