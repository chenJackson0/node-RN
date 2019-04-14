var mongoose = require('mongoose');
let blogSchema = new mongoose.Schema({
    id : {type : Number},
    perImg : {type : String},
    userName : {type : String},
    nickName : {type : String},
    publicHeadImg : [{img : {type : String}}],
    text : {type : String},
    flag : {type : Boolean},
    butText : {type : String},
    cllFlag : {type : Boolean},
    perUser : {type : String},
    playNum : {type : Number},
    commentsNum : {type : Number},
    time : {type : Number},
    timeText : {type : String},
    giveALike : {type : Array},
    data : {type : Array},
    address : {type : String},
    type : {type : String},
    commentsFlag : {type : Boolean},
    focusOnFlag : {type : Boolean},
    focusOn :{type : String},
    typeNum : {type : Number}
},{
    autoIndex: false
});
var publishedBase = mongoose.model('published',blogSchema)
module.exports = publishedBase