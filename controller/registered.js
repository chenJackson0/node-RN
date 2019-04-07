var express = require('express');
var md5 = require('md5')
var router = express.Router();
var registeredUser = require('../mongodb/schema/registeredUser')

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

//粉丝
router.post('/fensi',function(req, res, next) {
  registeredUser.updateOne({userName : req.body.userName},{$set : {
      "fensi" : req.body.fensi,
  }},function(err,doc){
    if(err){
      res.json({
        code : 500,
        message:'服务器开小差了,请稍后操作!'
      })
    }else if(doc){
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
});
//主播
router.post('/focusOn',function(req, res, next) {
  console.log(req.focusOns)
  registeredUser.updateOne({userName : req.body.userName},{$set : {
      "focusOns" : req.body.focusOns
  }},function(err,doc){
    if(err){
      res.json({
        code : 500,
        message:'服务器开小差了,请稍后操作!'
      })
    }else if(doc){
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
});
module.exports = router;