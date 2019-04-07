
const database = ()=>{
    var mongoose = require('mongoose');
    /* 连接*/
    mongoose.connect('mongodb://127.0.0.1:27017/commit', { useNewUrlParser: true });   
         
    
    /**连接成功 */
    mongoose.connection.on('connected',function(){
        console.log('Mongoose connection open to' +'mongodb://127.0.0.1:27017/commit'); 
    });
    
    /**连接失败 */
     mongoose.connection.on('error',function(){
         console.log('Mongoose connection error' +Error); 
     });
    
     /**连接断开 */
     mongoose.connection.on('disconnected',function(){
         console.log('Mongoose connection disconnected'); 
     });
    
    }
    module.exports = database;