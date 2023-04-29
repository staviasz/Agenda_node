require('dotenv').config(); //refere-se ao arquivo (.env) de senha pessoal para acesso ao db (deve estar no .gitignore)

const express = require('express');
const app = express();
const mongoose = require('mongoose'); // modelação de tabelas do mongodb
const { checkCsrfError, csrfMiddleware, middlewareGlobal } = require('./src/middlewares/middleware') // middlewares são funções executadas na rota


mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true}) // iniciar a conexao
.then(() => {
    console.log('conectei a base de dados')
    app.emit('pronto') //emite um sinal para o conteudo ser iniciado apenas depois da conexao
});

const session = require('express-session'); // identifica o navegador de um cliente e salva um cookie
const MongoStore = require('connect-mongo');// faz com que os cookies sejam salvos na db pois por padrao sao salvos na memoria sendo assim evita o consumo rapido de memoria
const flash = require('connect-flash');/* mensagens autodestrutivas apos serem impressas iram sumir, perfeito para msgs de erros ou algum feedback para o usuario
elas são salvas na sessão por isso as seções devem ser configuradas primeiro*/
const path = require('path'); // trabalha com caminhos dos documentos
const routes = require('./routes');
const helmet = require('helmet');// segurança da aplicação (leia a documentação)
const csrf = require('csurf');// tokens para impedir que qualquer invasor envie informações erradas em nosso site

// app.use(helmet());
app.use(express.urlencoded({extends: true})); // assim podemos postar formularios para dentro da aplicação
app.use(express.json()); //fazer o parc de JSON
app.use(express.static(path.resolve(__dirname, 'dist'))); // poder acessar diretamente os arquivos estaticos ex: css, img

const sessionOpitions = session({ // configuração de sessão
    secret: 'ntfgbhnjgbnbnedgbhaeugbhnhng',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})

app.use(sessionOpitions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views')); //são os arquivos reinderizados na tela
app.set('view engine', 'ejs');

app.use(csrf());// token

//middleware globais
app.use(checkCsrfError); 
app.use(csrfMiddleware); 
app.use(middlewareGlobal);

app.use(routes);


app.on('pronto', () => { // função esperando o retorno do "emit()"
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000')
    });
})