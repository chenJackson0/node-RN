var mongoose = require('mongoose');
let blogSchema = new mongoose.Schema({
    id: { type: Number },
    userName: { type: String },
    passWord: { type: String },
    fensi: { type: Array }, //关注主播的人
    focusOns: { type: Array }, //主播关注的人
    img: { type: String },
    commeName: { type: String },
    addCommentNum: { type: Number },
    focusOn: { type: String },
    focusOnFlag: { type: Boolean },
    address: { type: String },
    nickName: { type: String },
    webSite: { type: String },
    personalResume: { type: String },
    email: { type: String },
    phone: { type: String },
    sex: { type: String }
}, {
        autoIndex: false
    });
var registered = mongoose.model('registered', blogSchema)
module.exports = registered
