# ANP Data Crawler


First, you need to install `gulp-cli` and `babel-cli` to run, both globally:


```
npm install -g gulp-cli babel-cli
```

To start application, just run gulp

```
gulp
```

or

```
npm start
```

You don't need to create a database. The crawler will create the database based on application's models.

## Important
Wait until the server is up. A little after, the progress of crawling will be logged

## Configuring Database

You just need to open `config/default.json` and change the database configurations:

```
"db": {
    "name": "YOUR DB NAME",
    "host": "YOUR HOST",
    "user": "USER",
    "password": "PASS",
    "sgbd": "YOUR DIALECT",
    "port": THE PORT (NUMBER)
  }
  ```
  
  By default, I'm using the compose configuration. If you change the config json, when you start the application, the database will be created and the crawler will initiate.
  
  ## Endpoint
  
    
  `GET /reports/:initials/:week_id/:offset/:limit`
  
  Where:
    
  `:initials` - The state initials, passed in client
  `:week_id` - The week of reports
  `:offset` - Paginated search, offset
  `:limit`  - Paginated search, limit
  
  ## License
  
  MIT
