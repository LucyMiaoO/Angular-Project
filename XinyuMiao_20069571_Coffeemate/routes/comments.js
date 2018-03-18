var Comment = require('../models/comment');
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

router.addCom = function(req,res){
    var comment = new Comment();
    comment.content = req.body.content;
    comment.postername = req.body.postername;
    comment.time = req.body.time;

    comment.save(function(err){
        if(err){
            res.send(err);
        }else{
            res.json({message:" Comment has been added to board list successfully!"});
        }
    });
}


router.findAll = function(req,res){
    Comment.find(function(err,comments){
        if(err){
            res.send(err);
        }

        res.json(comments);
    });
}

router.deleteComment = function(req,res){
    Comment.findByIdAndRemove(req.params.id,function(err){
        if(err)
            res.send(err);
        router.findAll(req,res);
    });
}

module.exports = router;