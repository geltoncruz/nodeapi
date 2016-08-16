
// server.js

// BASE SETUP
// =============================================================================


// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var consign = require('consign');
consign()
    .include("routers")
    .into(app);

// Teste
var admin = express();


/**/

//Servicos estaticos
//Imagens, js, Css
app.use(express.static('public'));

var bodyParser = require('body-parser');

app.set("json spaces",4);

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/nodeapi');

var Bear       = require('./models/bear');
var aluno       = require('./routers/aluno');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


//middleware to  use for all requests
router.use(function(req, res, next){

  //do logging
  console.log('Tudo que esta acontecendo');
  next();

});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Bem vindo a nossa api!' });
});


// more routes for our API will happen here
// on routes that end in /bears

router.route('/bears')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)
        // save the bear and check for errors
        bear.save(function(resp, err) {
            if (err)
                res.send(err);
            res.json(resp);
        });

    })

.get(function(req,res){
    Bear.find(function(err,bears){
      if(err)
        res.send(err);

      res.json(bears);

    });

});
// on routes that end in /bears/:bear_id

router.route('/bears/:bear_id')

  .get(function(req, res){
    Bear.findById(req.params.bear_id, function(err, bear){
      if(err)
          res.send(err);
      res.json(bear);
    });
  })


  //Atualizar
  .put(function(req, res){

       Bear.findById(req.params.bear_id, function(err, bear) {
          if (err)
            res.send(err);

            bear.name = req.body.name;

              // save the bear
            bear.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            });
        });
  })

  .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// Admin Routers

router.route('/admin')

    .get(function(req,res){
        res.json({message   :   'Admin page'});
        console.log('admin');
});

router.route('/tarefas')

    .get(function(req,res){
        var content = {tarefas  :   [
            {title  : 'Agendar passaport'},
            {title  :   'Casar com clélia'}
        ]}
         res.charset = 'utf-8';
        res.json(content);
        console.log(content.tarefas[1]['title']);
});

    

// ssvar admin = express(); // the sub app

/*
admin.get('/', function (req, res) {
  console.log(admin.mountpath); // /admin
  // res.send('Admin Homepage');
  // var content = [{title:  'Admin Homepage', content:  'Lorem Ipsum'}];
  // res.json(content[title]);
  //res.sendFile('/images/11642441.jpg');

  var content = {
    title     : 'Titulo',
    content   : 'Lorem Ipsum',
    subtitle  : 'Lorem Lorem Lorek'
  }
  res.json(content.subtitle);
});

*/
// Aluno Routers



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
//app.use('/aluno', router);
//app.use('/admin', admin); // mount the sub app
//pp.use('/aluno', aluno);



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
