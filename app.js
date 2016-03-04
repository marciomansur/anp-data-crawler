import express    from 'express';
import config     from 'config';
import bodyParser from 'body-parser';
import db         from './app/lib/db';

import cron from './app/lib/cronjobs';

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

