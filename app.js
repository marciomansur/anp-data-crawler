var express = require('express');
var config  = require('config');

var app = express();
var port = process.env.PORT || 8080;

// Setting port
app.set('port', port);

app.listen(app.get('port'), (err) =>{

    if(err)
        return console.log(`Error when initializing the server: ${err}`);

    console.log(`Server up, port: ${port}`);
});
