const mongoose = require('mongoose');
const { async } = require('regenerator-runtime');
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: '' },
  telefone: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  criadoEm: { type: Date, default: Date.now }
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
  constructor(body) {
    this.body = {
      nome: body.nome,
      sobrenome: body.sobrenome,
      telefone: body.telefone,
      email: body.email,
    };
    this.errors = [];
    this.contato = null;
  }

  async register() {
    this.valida();
    if (this.errors.length > 0) return
    this.contato = await ContatoModel.create(this.body);
  }

  valida() {
    this.cleanUp();
    //o email seja valido
    if (this.body.email && !validator.isEmail(this.body.email)) {
      this.errors.push('Email invalido');
    }
    if (!this.body.nome) this.errors.push('Digite o nome do contato')
    if (!this.body.email && !this.body.telefone) this.errors.push('Digite um contato: E-mail ou Telefone.')
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }
  }

  async edit(id) {
    if (typeof id !== 'string') return;
    this.valida();
    if (this.errors.length > 0) return;
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
  }
}

async function buscaPorId(id) {
  if (typeof id !== 'string') return
  const contato = await ContatoModel.findById(id);
  return contato;
}

async function buscaContatos() {
  const contatos = await ContatoModel.find()
    .sort({ criadoEm: -1 });
  return contatos;
}

async function apagarContatos(id) {
  if (typeof id !== 'string') return
  const contato = await ContatoModel.findOneAndDelete({ _id: id })
  return contato;
}

module.exports = { Contato, buscaPorId, buscaContatos, apagarContatos }; 
