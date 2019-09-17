var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const usr = require('../model/userSchema.js');
const func = require('../model/common.js');

router.get('/', function(req, res) {
    res.render('register');
});

router.post('/', function(req, res) {
    console.log('req.body', req.body);
    var fn = req.body.firstName;
    var ln = req.body.lastName;
    var email = req.body.email;
    var passwd = req.body.password;

    if (!func.isBlank(fn) && !func.isEmpty(fn) && !func.isBlank(ln) && !func.isEmpty(ln) && !func.isBlank(email) && !func.isEmpty(email) && !func.isBlank(passwd) && !func.isEmpty(passwd)) {
        if (func.ValidateEmail(email)) {
            usr.find({
                email: email
            }, function(err, docs) {
                if (err) {
                    res.render('register', {
                        message: 'Some error occured'
                    });
                } else if (!func.isEmpty(docs) || !func.isBlank(docs)) {
                    res.render('register', {
                        message: 'User is already registered'
                    });
                } else {
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        bcrypt.hash(passwd, salt, function(err, hash) {
                            var new_user = new usr({
                                firstname: fn,
                                lastname: ln,
                                email: email,
                                passwd: hash
                            });
                            new_user.save(function(err, new_user) {
                                if (err) {
                                    res.render('register', {
                                        message: 'Some error occured'
                                    });
                                } else {
                                    res.render('restaurants');
                                }
                            });
                        });
                    });
                }
            })
        } else {
            res.render('register', {
                message: 'Invalid email id'
            });
        }
    } else {
        res.render('register', {
            message: 'Missing fields'
        });
    }

});


module.exports = router;
