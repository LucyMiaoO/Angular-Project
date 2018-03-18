var User = require('../models/users');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/coffeedb');

var db = mongoose.connection;

db.on('error', function (err) {
  console.log('connection error', err);
});
db.once('open', function () {
  console.log('connected to database');
});

router.addUser = function(req, res) {

  var user = new User();
  user.name=req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

  console.log('Adding user: ' + JSON.stringify(user));

  user.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'User Added!', data: user});
  });
}
router.login = function(req,res){
  var input = req.body;
  User.find({"email": input.email},function(err,user){
    if(user.length != 0){
      if(user[0].password == input.password){
        res.json({obj: user[0]});
      }else{
        res.json({message: "Password wrong!"});
      }
    }else{
      res.json({message: "User does not exist!"});
    }
  });
}

router.findOne = function(req, res) {

  User.find({ "_id" : req.params.id },function(err,user) {
    if (err)
      res.json({ message: 'user NOT Found!', errmsg : err } );
    else
      res.json(user);
  });
}

module.exports = router;
