var mongoose = require('mongoose');
let blogSchema = new mongoose.Schema({
    id: { type: Number },
    perUserName: { type: String },
    name: { type: String },
    img: { type: Array }
}, {
        autoIndex: false
    });
var collection = mongoose.model('collection', blogSchema)
module.exports = collection
