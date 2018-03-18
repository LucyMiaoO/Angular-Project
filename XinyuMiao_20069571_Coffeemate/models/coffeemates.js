var mongoose = require('mongoose');

var CoffeemateSchema = new mongoose.Schema({
    name: String,
    coffeeshop: String,
    amount: Number,
    poster: String,
    upvotes: {type: Number, default: 0},
    favourite: {type: Boolean, default : false},
    star: {type: Number, default: 0}
});

module.exports = mongoose.model('Coffeemate', CoffeemateSchema);