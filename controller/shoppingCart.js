var express = require('express');
var router = express.Router();
var shoppingCart = require('../mongodb/schema/shoppingCartBase')
router.post('/shoppingCart',function(req, res, next) {
    shoppingCart.find({sku : req.body.sku},function(err,doc){
        if(err){
            res.json({
              code : 500,
              message:'服务器开小差了,请稍后操作!'
            })
        }else if(doc.length !=0){
            shoppingCart.updateOne({sku : req.body.sku},{
                "number" : doc[0].number + 1
            },function(err,doc){
                if(err){
                    res.json({
                      code : 500,
                      message:'服务器开小差了,请稍后操作!'
                    })
                }else if(doc.n>0){
                    res.json({
                        code : 200,
                        message:'添加购物车成功!'
                      })
                }else{
                    res.json({
                        code : 400,
                        message:'添加购物车失败!'
                      })
                }
            })
        }else{
            shoppingCart.create(req.body,function(err,doc){
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
                    message:'缺少参数,添加失败!'
                })
                }
              })
        }
    })
});
module.exports = router;