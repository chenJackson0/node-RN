var express = require('express');
var md5 = require('md5')
var router = express.Router();
var collectionItem = require('../mongodb/schema/collectionItem')

//收藏作品
router.post('/collection', function (req, res, next) {
  collectionItem.create(req.body, function (err, doc) {
    if (err) {
      res.json({
        code: 500,
        message: '服务器开小差了,请稍后操作!'
      })
    } else if (doc) {
      res.json({
        code: 200,
        message: '收藏成功!'
      })
    } else {
      res.json({
        code: 400,
        message: '缺少参数,收藏失败!'
      })
    }
  })
});
//取消收藏作品
router.post('/deleteCollection', function (req, res, next) {
  collectionItem.deleteOne({ id: req.body.id }, function (err, doc) {
    if (err) {
      res.json({
        code: 500,
        message: '服务器开小差了,请稍后操作!'
      })
    } else if (doc) {
      res.json({
        code: 200,
        message: '取消成功!'
      })
    } else {
      res.json({
        code: 400,
        message: '缺少参数,取消收藏失败!'
      })
    }
  })
});
//查询收藏作品
router.post('/findCollection', function (req, res, next) {
  collectionItem.find({}, function (err, doc) {
    if (err) {
      res.json({
        code: 500,
        message: '服务器开小差了,请稍后操作!'
      })
    } else if (doc) {
      res.json({
        code: 200,
        collectionList: doc
      })
    } else {
      res.json({
        code: 400,
        message: '缺少参数,查询作品失败!'
      })
    }
  })
});
module.exports = router;