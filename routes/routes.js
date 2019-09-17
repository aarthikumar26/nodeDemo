var express = require('express');


module.exports = function(app){
    try{
        app.use('/registration', require('../controllers/register.js'));
        app.use('/login', require('../controllers/login.js'));
        app.use('/restaurants', require('../controllers/restaurants.js'));
    }
    catch(error) {
        console.log('Route Error',error);
    }
}
