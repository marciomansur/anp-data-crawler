// Requiring the babel-register core
require('babel-register')({
  "presets": ["es2015"]
});

import express  from 'express';
var config      = require('config');
var bodyParser 	= require('body-parser');
var db          = require('./app/lib/db');

var app = express();
var port = process.env.PORT || config.get("http.port");

// Setting port
app.set('port', port);

// Setting Configurations
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

db.sequelize.sync().done(() =>{

  app.listen(app.get('port'), (err) =>{

    if(err)
      return console.log(`Error when initializing the server: ${err}`);

    console.log(`Server up, port: ${port}`);
  });

});

