var mongoose = require('mongoose');
let blogSchema = new mongoose.Schema({
    name : {type : String},
    img : {type : String},
    price : {type : Number},
    number : {type : Number},
    sku : {type : String},
    type : {type : Number},
    description : {type : String}
},{
    autoIndex: false
});
var project = mongoose.model('project',blogSchema)
module.exports = project
