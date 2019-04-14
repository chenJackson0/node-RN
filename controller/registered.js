var express = require('express');
var md5 = require('md5')
var router = express.Router();
var registeredUser = require('../mongodb/schema/registeredUser')
var publishedBase = require('../mongodb/schema/publishedBase')
//添加新注册的用户
router.post('/registered',function(req, res, next) {
    req.body.passWord = md5(req.body.passWord)
    registeredUser.create(req.body,function(err,doc){
      if(err){
        res.json({
          code : 500,
          message:'服务器开小差了,请稍后操作!'
        })
      }else if(doc){
        res.json({
          code : 200,
          message:'注册成功!'
        })
      }else{
        res.json({
          code : 400,
          message:'缺少参数,注册失败!'
      })
      }
    })
});

//查找已经注册过的用户
router.post('/getUser', function(req, res, next) {
  registeredUser.findOne({userName : req.body.userName},function(err,doc){
    if(err){
      res.json({
        code : 500,
        message:'服务器开小差了,请稍后操作!'
      })
    }else if(doc){
      res.json({
        code : 400,
        message : '用户已经被注册'
      })
    }else{
      registeredUser.find({},function(err,doc){
        res.json({
          code : 200,
          count : doc.length
        })
      })
    }
  })
});

//登录
router.post('/login', function(req, res, next) {
  registeredUser.findOne({userName : req.body.userName},function(err,doc){
    if(err){
      res.json({
        code : 500,
        message:'服务器开小差了,请稍后操作!'
      })
    }else if(doc){
      if(doc.passWord == md5(req.body.passWord) && doc.userName == req.body.userName){
        res.json({
          code : 200,
        })
      }else{
        res.json({
          code : 400,
          message:'帐号或密码错误'
        })
      }
    }else{
      res.json({
        code : 400,
        message : '帐号没有注册,请先注册'
      })
    }
  })
});
//查找的用户并编辑资料
router.post('/selectPerUser', function(req, res, next) {
  registeredUser.findOne({userName : req.body.userName},function(err,doc){
    if(err){
      res.json({
        code : 500,
        message:'服务器开小差了,请稍后操作!'
      })
    }else if(doc){
      res.json({
        code : 200,
        userMessage : doc
      })
    }else{
      res.json({
        code : 400,
        message : '缺少参数,查询用户信息失败'
      })
    }
  })
});
//更新用户个人中心
router.post('/editPerUser', function(req, res, next) {
  registeredUser.updateOne({userName : req.body.userName},{$set : {
    "nickName" : req.body.nickName, 
    "img" : req.body.img,
    "webSite" : req.body.webSite,
    "personalResume" : req.body.personalResume,
    "email" : req.body.email,
    "phone" : req.body.phone,
    "sex" : req.body.sex,
  }},function(err,doc){
    if(err){
      res.json({
        code : 500,
        message:'服务器开小差了,请稍后操作!'
      })
    }else if(doc.nModified>0){
      //编辑个人信息切换图片的时候,更新之前发布的作品的图像
      publishedBase.update({userName : req.body.userName},{$set : {
        "perImg" : req.body.img,"nickName" : req.body.nickName
      }},function(err,doc){})
      //用户编辑个人信息时,修改之前主播的呢称
      registeredUser.updateMany({"focusOns.name":req.body.userName},{$set : {
        "focusOns.$.nickName" : req.body.nickName,
        "focusOns.$.img":req.body.img
      }},function(err,doc){})
      //用户编辑个人信息时,修改之前粉丝的呢称
      registeredUser.updateMany({"fensi.name":req.body.userName},{$set : {
        "fensi.$.nickName" : req.body.nickName,
        "fensi.$.img":req.body.img
      }},function(err,doc){})
      res.json({
        code : 200,
        message : "修改成功!"
      })
    }else{
      res.json({
        code : 400,
        message : '用户信息没有任何改动,编辑用户信息失败!'
      })
    }
  })
});
//粉丝
fensi = (req) => {
  var data = {}
  registeredUser.updateOne({userName : req.body.fensiUserName},{$set : {
    "fensi" : req.body.fensi,"focusOnFlag" : req.body.focusOnFlag
  }},function(err,doc){
    if(err){
      data = {
        code : 200,
        message:'服务器开小差了,请稍后操作!'
      }
    }else if(doc.nModified>0){
      data = {
        code : 200,
        message:'关注成功!'
      }
    }else{
      data = {
        code : 400,
        message:'缺少参数,关注失败!'
      }
    }
  })
  return data
}
//主播
router.post('/focusOn',function(req, res, next) {
  registeredUser.updateOne({userName : req.body.focusOnUserName},{$set : {
      "focusOns" : req.body.focusOns
  }},function(err,doc){
    if(err){
      res.json({
        code : 500,
        message:'服务器开小差了,请稍后操作!'
      })
    }else if(doc.nModified>0){
      registeredUser.updateOne({userName : req.body.fensiUserName},{$set : {
        "fensi" : req.body.fensi,"focusOnFlag" : req.body.focusOnFlag
      }},function(err,doc){
        if(err){
          res.json({
            code : 200,
            message:'服务器开小差了,请稍后操作!'
          })
        }else if(doc.nModified>0){
          res.json({
            code : 200,
            message:'关注成功!'
          })
        }else{
          res.json({
            code : 400,
            message:'缺少参数,关注失败!'
          })
        }
      })
    }else{
      res.json({
        code : 400,
        message:'缺少参数,关注失败!'
      })
    }
  })
});
//模糊查询用户
router.post('/rearch', function(req, res, next) {
  registeredUser.find({"$or":[{"userName" : {$regex : req.body.userName}},{"nickName" : {$regex : req.body.userName}}]},function(err,doc){
    if(err){
      res.json({
        code : 500,
        message:'服务器开小差了,请稍后操作!'
      })
    }else if(doc){
      res.json({
        code : 200,
        commitList : doc
      })
    }else{
      res.json({
        code : 400,
        message : '缺少参数,查询失败'
      })
    }
  })
});
module.exports = router;