var express = require('express');
var router = express.Router();
var projectCategoriesBase = require('../mongodb/schema/ProductCategoriesBase')
router.post('/projectCategories', function (req, res, next) {
  projectCategoriesBase.create(req.body, function (err, doc) {
    if (err) {
      res.json({
        code: 500,
        message: '服务器开小差了,请稍后操作!'
      })
    } else if (doc) {
      res.json({
        code: 200,
        message: '成功!'
      })
    } else {
      res.json({
        code: 400,
        message: '缺少参数,注册失败!'
      })
    }
  })
});
module.exports = router;