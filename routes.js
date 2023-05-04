const express = require('express');
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const acessoController = require('./src/controllers/acessoController');
const contatoController = require('./src/controllers/contatoController');

const {loginRequired} = require('./src/middlewares/middleware')


const route = express.Router();


// rotas da home
route.get('/', homeController.index); // sem receber parametros da url

//rotas de login
route.get('/login', loginController.index);
route.post('/login', loginController.login);
route.get('/login/logout', loginController.logout)
route.post('/login/register', loginController.register)
route.get('/acesso', acessoController.acesso)

// rotas de contato
route.get('/contato',loginRequired, contatoController.index);
route.post('/contato', contatoController.register);
route.get('/contato/:id',loginRequired, contatoController.ContatoIndex);
route.post('/contato/edit/:id',loginRequired, contatoController.editContato);
route.get('/contato/delete/:id',loginRequired, contatoController.deleteContato);



module.exports = route





// // recebendo parametros da url

// app.get('/teste/:idUsuarios?', (req, res) => {
//     console.log(req.params) //parametros de rota da url
//     console.log(req.query) // parametros que existem depois da "?" nas urls
//     res.send(req.params.idUsuarios);
// });

// app.post('/', (req, res) => {
//     console.log(req.body);
//     res.send(`recebi o formulario  ${req.body.nome}` ) //* recebe os parametros enviados no corpo dos formularios
// })

