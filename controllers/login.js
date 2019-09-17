var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const usr = require('../model/userSchema.js');
const func = require('../model/common.js');


router.get('/', function(req, res){
    res.render('login');
});

router.post('/', function(req, res){


    var email = req.body.email;
    var passwd = req.body.password;


if( !func.isBlank(email) && !func.isEmpty(email) && !func.isBlank(passwd) && !func.isEmpty(passwd)){
    if(func.ValidateEmail(email)){
        usr.find({email: email}, function(err, docs){
                if(err){
                    res.render('login',{message: 'Some error occured'} );
                }
                else if (!func.isEmpty(docs) || !func.isBlank(docs)) {
                    var hash = docs[0].passwd;
                    bcrypt.compare(passwd, hash, function(err, result) {
                        if(result){
                            res.redirect("/restaurants");
                    }
                    else{
                        res.render('login',{message: 'Invalid password'} );
                    }
                });
            }
                else{
                    res.render('login',{message: 'User does not exist'} );
                }
            })
    }
    else{
        res.render('login',{message: 'Email id is not valid'} );
    }
}
else{
    res.render('login',{message: 'Email or password is missing'} );
}
});

module.exports = router;
