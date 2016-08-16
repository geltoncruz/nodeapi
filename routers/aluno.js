////#router
////var app2 = getElementById('cs');
//
///*var express = require('express');
//var app = express();
//
//var router = express.Router();
//*/
//
//var express = require('express');
//var app = express();
//var aluno = express();
//
//aluno.get('/',function(req,res){
//  console.log(aluno.mountpath);
//  res.send('Aluno page');
//});
////
//app.use('/aluno',aluno);
//
//var args = {
//  title :  'Aluno',
//  age   :   21
//};
//console.log(args.age);

module.exports = function(app){
    
    app.get('/aluno',function(req, res){
        res.json({message   : 'Alunos'});
    })
}