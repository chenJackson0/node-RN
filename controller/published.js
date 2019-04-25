var express = require('express');
var router = express.Router();
var publishedBase = require('../mongodb/schema/publishedBase')
var registeredUser = require('../mongodb/schema/registeredUser')
var collectionItem = require('../mongodb/schema/collectionItem')
//发布作品
router.post('/published', function (req, res, next) {
  publishedBase.create(req.body, function (err, doc) {
    if (err) {
      res.json({
        code: 500,
        message: '服务器异常,请稍后操作!'
      })
    } else if (doc) {
      res.json({
        code: 200,
        message: '添加成功'
      })
    } else {
      res.json({
        code: 400,
        message: '确实参数,添加失败!'
      })
    }
  })
});
//查找作品
router.post('/selectPublished', function (req, res, next) {
  publishedBase.find().sort({ id: -1 }).exec(function (err, doc) {
    if (err) {
      res.json({
        code: 500,
        message: '服务器开小差了,请稍后操作!'
      })
    } else if (doc) {
      registeredUser.find().sort({ id: -1 }).exec(function (err, docUserList) {//查找所以用户
        if (docUserList) {
          collectionItem.find().sort({ id: -1 }).exec(function (err, collectionList) {//查找收藏作品
            res.json({
              code: 200,
              list: doc,
              userList: docUserList,
              collectionList: collectionList
            })
          })
        } else {
          res.json({
            code: 400,
            message: '查询失败!'
          })
        }
      })
    } else {
      res.json({
        code: 400,
        message: '目前没有任何作品.'
      })
    }
  })
});
//删除作品
router.post('/deletePublished', function (req, res, next) {
  publishedBase.deleteOne({ id: req.body.id }, function (err, doc) {
    if (err) {
      res.json({
        code: 500,
        message: '服务器开小差了,请稍后操作!'
      })
    } else if (doc) {
      res.json({
        code: 200,
        message: '删除成功!'
      })
    } else {
      res.json({
        code: 400,
        message: '缺少参数,删除失败!'
      })
    }
  })
});
//点赞作品
router.post('/updateOnePublished', function (req, res, next) {
  publishedBase.updateOne({ id: req.body.id }, {
    $set: {
      "giveALike": req.body.giveALike
    }
  }, function (err, doc) {
    if (err) {
      res.json({
        code: 500,
        message: '服务器开小差了,请稍后操作!'
      })
    } else if (doc.nModified > 0) {
      res.json({
        code: 200,
        message: '点赞成功!'
      })
    } else {
      res.json({
        code: 400,
        message: '缺少参数,点赞失败!'
      })
    }
  })
});
//评论作品
router.post('/commentsWork', function (req, res, next) {
  publishedBase.updateOne({ id: req.body.id }, {
    $set: {
      "data": req.body.data, "commentsNum": req.body.commentsNum
    }
  }, function (err, doc) {
    if (err) {
      res.json({
        code: 500,
        message: '服务器开小差了,请稍后操作!'
      })
    } else if (doc.nModified > 0) {
      res.json({
        code: 200,
        message: '评论成功!'
      })
    } else {
      res.json({
        code: 400,
        message: '缺少参数,评论失败!'
      })
    }
  })
});
//多级评论
router.post('/eveyComments', function (req, res, next) {
  publishedBase.updateOne({ id: req.body.id, "data.data.id": req.body.index }, {
    $set: {
      "data.$.data.0.replyToComment": req.body.data,
      "data.$.data.0.replyToCommentMaxFlag": req.body.replyToCommentMaxFlag,
      "data.$.data.0.replyToCommentListFlag": req.body.replyToCommentListFlag,
      "data.$.data.0.replyToCommentListT": req.body.replyToCommentListT,
    }
  }, function (err, doc) {
    if (err) {
      res.json({
        code: 500,
        message: '服务器开小差了,请稍后操作!'
      })
    } else if (doc.nModified > 0) {
      res.json({
        code: 200,
        message: '评论成功!'
      })
    } else {
      res.json({
        code: 400,
        message: '缺少参数,评论失败!'
      })
    }
  })
});
module.exports = router;