const mongoose = require('mongoose');


const usrSchema = mongoose.Schema({ firstname: 'string', lastname: 'string' ,  email: 'string', passwd: 'string'});

const usr = mongoose.model('reg_users', usrSchema);


module.exports = usr;
