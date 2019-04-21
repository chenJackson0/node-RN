//模块依赖
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var database = require('./mongodb/db')
var registered = require('./controller/registered');
var published = require('./controller/published');
var collection = require('./controller/collection');
var projects = require('./controller/projects')
var projectCategories = require('./controller/projectCategories')
var shoppingCart = require('./controller/shoppingCart')
//添加,导入http模块
var http=require('http');
var server = express(); 
database()
//设置端口号
server.set('port', process.env.PORT || 27017);

//视图引擎设置
server.set('views', path.join(__dirname, 'views'));
// server.set('view engine', 'ejs'); 
//加载环境变量
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public'))); 

//加载静态路由
server.use(express.static(path.join(__dirname, 'resourse')));


//加载路由
server.use('/registered', registered);
server.use('/published', published);
server.use('/collection', collection);
server.use('/projects', projects);
server.use('/projectCategories', projectCategories);
server.use('/shoppingCart', shoppingCart);
//启动及端口
http.createServer(server).listen(server.get('port'),function(){    
      console.log('Express server listening on port ' + server.get('port'));
}); 

//加载错误处理解决办法
//404
server.use(function(req, res, next) {  
     var err = new Error('Not Found');
     err.status = 404;
     next(err);
});

//500
if (server.get('env') === 'development') {  
      server.use(function(err, req, res, next) {    
    res.status(err.status || 500);
    res.render('error', {      
         message: err.message,      
         error: err    
   });
  });
}

server.use(function(err, req, res, next) {
      res.status(err.status || 500);  
      res.render('error', { 
          message: err.message,
          error: {}  
  });
});

//导出app对象
module.exports = server;
