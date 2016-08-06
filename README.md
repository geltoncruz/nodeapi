 # Bear Node Api

## Instalação
```bash
  $ git clone https://github.com/thiagoleitedev/node-express-boilerplate
  $ cd node-express-boilerplate
  $ npm install
  $ npm start
```
 ## Aplicação

 trabalharemos na construção de uma api que terá:

* Trabalho com crud para cada item.
* Url padrão <code> http://url/api/bears </code> e <code> http://url/api/bears/:bear_id </code>
* Verbos HTTP para trabalhar com __RESTful__ <code>GET,POST,PUT e DELETE</code>
* Retorno de dados em JSON.
* todas as aquisições registradas em console.


## Iniciando
 Construiremos a estrutura representada abaixo:

 ```bash
 - app/
  ----- models/
 ---------- bear.js  // our bear model
 - node_modules/     // created by npm. holds our dependencies/packages
 - package.json      // define all our node app and dependencies
 - server.js         // configure our application and create routes
 ```
###  Definindo nosso *package.json*

```js
// package.json

{
    "name": "node-api",
    "main": "server.js",
    "dependencies": {
        "express": "~4.0.0",
        "mongoose": "~3.6.13",
        "body-parser": "~1.0.1"
    }
}
```

### Instalando os pacotes

```bash
$ npm install
```

### Escrevendo nosso servidor server.js

```js
// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Bem vindo a nossa api!' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
///=======
# nodeapi
> Preparando material de aula de nodeJs utilizando bibliotecas babel e express

```js

var express;


```
