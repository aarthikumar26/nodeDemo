        var createError = require('http-errors');
        var express = require('express');
        var path = require('path');
        var cookieParser = require('cookie-parser');
        var logger = require('morgan');
        const mongoose = require('mongoose');

        var http = require('http');

        var app = express();


        // DATABASE CONNECTION 
        mongoose.connect('mongodb://localhost:27017/uber', function(error) {
            if (error) {
                console.log('MongoDB connection error: ', error);
            } else {
                console.log('MongoDB connected successfully !!');
            }
        })

        app.set('port', 3000);

        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'pug');

        app.use(logger('dev'));
        app.use(express.json());
        app.use(express.urlencoded({extended: false}));
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, 'public')));

        require('./routes/routes')(app);


        var server = http.createServer(app);
        server.listen(3000);
        server.on('listening', onListening);

        function onListening(){
            var addr = server.address();
            console.log('Server Started Successfully !! Check localhost:', addr.port);
        }
