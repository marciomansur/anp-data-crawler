var config    = require('config');
var Sequelize = require('sequelize'),
    sequelize = new Sequelize(

        config.get("db.name"),
        config.get("db.user"),
        config.get("db.password"), {

            dialect: config.get("db.sgbd"),
            port: config.get("db.port")
    });

sequelize
    .authenticate()
        .then((err) =>{
        })
        .catch((err) => {

            console.log(`Error in database: ${err}`);
});

module.exports = sequelize;