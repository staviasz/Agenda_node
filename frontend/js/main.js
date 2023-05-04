import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login';
import CadastroAtualizacao from './modules/CadastroAtualizacao';


console.log('ola mundo')

const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro')

login.init();
cadastro.init(); 

const cadastroContato = new CadastroAtualizacao('.form-cadastro-contato')
const atualizacaoContato = new CadastroAtualizacao('.form-atualizacao-contato')

cadastroContato.init()
atualizacaoContato.init()