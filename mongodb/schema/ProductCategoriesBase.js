var mongoose = require('mongoose');
let blogSchema = new mongoose.Schema({
    title: { type: String },
    type: { type: Number }
}, {
        autoIndex: false
    });
var projectCategories = mongoose.model('projectCategories', blogSchema)
module.exports = projectCategories
