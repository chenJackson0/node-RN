var express = require('express');
var router = express.Router();
var projectList = require('../mongodb/schema/projectList')
var ProductCategoriesBase = require('../mongodb/schema/ProductCategoriesBase')
router.post('/project',function(req, res, next) {
    projectList.create(req.body,function(err,doc){
      if(err){
        res.json({
          code : 500,
          message:'服务器开小差了,请稍后操作!'
        })
      }else if(doc){
        res.json({
          code : 200,
          message:'成功!'
        })
      }else{
        res.json({
          code : 400,
          message:'缺少参数,失败!'
      })
      }
    })
});
//查找礼品列表
router.post('/projectlist',function(req, res, next) {
  var type = req.body.type ? req.body.type : 0
  projectList.find({type : type},function(err,doc){
    if(err){
      res.json({
        code : 500,
        message:'服务器开小差了,请稍后操作!'
      })
    }else if(doc){
      ProductCategoriesBase.find({},function(err,projectTitle){
        if(err){
          res.json({
            code : 500,
            message:'服务器开小差了,请稍后操作!'
          })
        }else if(projectTitle){
          res.json({
            code : 200,
            projectlist : doc,
            projectTitle : projectTitle
          })
        }
      })
    }else{
      res.json({
        code : 400,
        message:'参数缺失,查询失败!'
    })
    }
  })
});
module.exports = router;