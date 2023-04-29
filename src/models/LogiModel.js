const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true},
    senha: { type: String, required: true},
});

const LoginModel = mongoose.model('login', LoginSchema);

class login {
    constructor(body) {
        this.body = {
                email: body.email,
                senha: body.senha
            };
        this.errors = [];
        this.user = null; 
    }
    async register() {
        this.valida();
        if (this.errors.length > 0) return; // a 1 verificação é feita com os dados puros
        await this.userExists();
        if (this.errors.length > 0) return; // a 2 verificação é feita apos a validação de usuario existente
        
        const salt = bcryptjs.genSaltSync();
        this.body.senha = bcryptjs.hashSync(this.body.senha, salt);
        this.user = await LoginModel.create(this.body);
    }

    async login() {
        this.valida();
        if (this.errors.length > 0) return;
        this.user = await LoginModel.findOne({email: this.body.email});

        if (!this.user) {
            this.errors.push('Usuário não existe')
            return
        }

        if (!bcryptjs.compareSync(this.body.senha, this.user.senha)) {
            this.errors.push('Senha invalida');
            this.user = null
            return
        }
    }

    async userExists() {
        const user = await LoginModel.findOne({email: this.body.email});
        if (user) this.errors.push('Usuário já existe')
    }
    
    valida() {
        this.cleanUp();
        //o email seja valido
        if (!validator.isEmail(this.body.email)) {
            this.errors.push('Email invalido');
        }
        //a senha tenha entre 6 a 20 caracteres
        if (this.body.senha.length < 6 || this.body.senha.length > 20 ) {
            this.errors.push('A senha precisa ter entre 6 e 20 caracteres');
        }
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
    }

    
}

module.exports = login;