const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
    title: String, 
    price: Number,
    Description: String,
    location: String
})

module.exports = mongoose.model('Property',PropertySchema);