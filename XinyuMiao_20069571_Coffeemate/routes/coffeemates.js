var Coffeemate = require('../models/coffeemates');
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

router.findAll = function(req, res) {

    Coffeemate.find(function(err, coffeemates) {
        if (err)
            res.send(err);
        else
            res.json(coffeemates);
    });
};

router.findOne = function(req, res) {

    Coffeemate.find({ "_id" : req.params.id },function(err, coffeemate) {
        if (err)
            res.json({ message: 'Coffeemate NOT Found!', errmsg : err } );
        else
            res.json(coffeemate);
    });
};

router.addCoffeemate = function(req, res) {

    var coffeemate = new Coffeemate();
    coffeemate.coffeeshop=req.body.coffeeshop;
    coffeemate.name = req.body.name;
    coffeemate.amount = req.body.amount;
    coffeemate.poster = req.body.poster;


    console.log('Adding coffeemate: ' + JSON.stringify(coffeemate));

    coffeemate.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Coffeemate Added!', data: coffeemate});
    });
};

router.deleteCoffeemate = function(req, res) {

    Coffeemate.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Coffeemate Deleted!', data: Coffeemate});
    });
};

router.incrementUpvotes = function(req, res) {

    Coffeemate.findById(req.params.id, function(err,coffeemate) {
        if (err)
            res.send(err);
        else {
            coffeemate.upvotes += 1;
            coffeemate.save(function (err) {
                if (err)
                    res.send(err);
                else
                res.json({ message: 'Coffeemate Upvoted!', data:coffeemate });
            });
        }
    });
};

router.updateCoffeemate = function(req,res) {
    console.log(req.body);
    Coffeemate.findByIdAndUpdate(req.params.id,
        {name: req.body.name, coffeeshop: req.body.coffeeshop,amount:req.body.amount},
        function(err){
            if (err)
                res.send(err);

            router.findAll(req,res);
        });
};


module.exports = router;