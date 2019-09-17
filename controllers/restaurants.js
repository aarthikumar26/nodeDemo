    var express = require('express');
    var router = express.Router();
    var request = require('request');


router.get('/', function(req, res){
    res.render('restaurants');
})


router.post('/', function(req, res){
    var lat = req.body.lat;
    var lon = req.body.lon;
    var url = 'https://developers.zomato.com/api/v2.1/establishments?lat='+lat+'&lon='+lon+'';
    console.log(url);

    var options = {
        method:'GET',
      url: url,
      headers: {
        'user-key': 'be6776cc029f7365d991bb2858e9b5ca'
      }
    };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log(info);
        res.send(info.establishments);
      }
    }

    request(options, callback);
});


module.exports = router;
