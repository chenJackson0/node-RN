var express = require('express');
var router = express.Router();
var publishedBase = require('../mongodb/schema/publishedBase')
var registeredUser = require('../mongodb/schema/registeredUser')
//发布作品
router.post('/published',function(req, res, next) {
    publishedBase.create(req.body,function(err,doc){
      if(err){
        res.json({
          code : 500,
          message:'服务器异常,请稍后操作!'
        })
      }else if(doc){
        res.json({
          code : 200,
          message:'添加成功'
        })
      }else{
        res.json({
          code : 400,
          message:'确实参数,添加失败!'
        })
      }
    })
});

//查找作品
router.post('/selectPublished',function(req, res, next) {
    var userList = []
    
    publishedBase.find({},function(err,doc){
      if(err){
        res.json({
          code : 500,
          message:'服务器开小差了,请稍后操作!'
        })
      }else if(doc){
        registeredUser.find({},function(err,docUserList){
            if(err){
                res.json({
                  code : 500,
                  message:'服务器开小差了,请稍后操作!'
                })
            }else if(docUserList){
                res.json({
                    code : 200,
                    list : doc,
                    userList : docUserList
                })
            }else{
              res.json({
                code : 400,
                message:'查询失败!'
            })
            }
        })
      }else{
        res.json({
            code : 400,
            message:'目前没有任何作品.'
        })
      }
    })
});
//删除作品
router.post('/deletePublished',function(req, res, next) {
    publishedBase.deleteOne({id : req.body.id},function(err,doc){
      if(err){
        res.json({
          code : 500,
          message:'服务器开小差了,请稍后操作!'
        })
      }else if(doc){
        res.json({
            code : 200,
            message:'删除成功!'
        })
      }else{
        res.json({
          code : 400,
          message:'缺少参数,删除失败!'
      })
      }
    })
});
//更新作品
router.post('/updateOnePublished',function(req, res, next) {
    publishedBase.updateOne({id : req.body.id},{$set : {
        "giveALike" : req.body.giveALike
    }},function(err,doc){
      if(err){
        res.json({
          code : 500,
          message:'服务器开小差了,请稍后操作!'
        })
      }else if(doc){
        res.json({
            code : 200,
            message:'更新成功!'
        })
      }else{
        res.json({
          code : 400,
          message:'缺少参数,点赞失败!'
      })
      }
    })
});
module.exports = router;