import validator from "validator";

import ParagrafoErro from "./ParagrafoErro";


export default class CadastroAtualizacao {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      const el = e.target;
      const inputNome = this.form.querySelector('input[name=nome');
      const inputTelefone = this.form.querySelector('input[name=telefone');
      const inputEmail = this.form.querySelector('input[name=email');
      this.validate(el, inputNome, inputTelefone, inputEmail)
    });
  }


  validate(el, inputNome, inputTelefone, inputEmail) {
    let error = false;
    const erroP = new ParagrafoErro
    console.log(inputNome)
    if (!inputNome.value) {
      const msgError = 'Digite um Nome valido'
      erroP.paragrafoError(inputNome, msgError)
      error = true;
    } else {
      erroP.removeParagrafoErro(inputNome)
    }

    
    if (!inputEmail.value && !inputTelefone.value) {
      const msgError = 'Digite um contato: E-mail ou Telefone.'
      erroP.paragrafoError(inputEmail, msgError)
      erroP.paragrafoError(inputTelefone, msgError)
      error = true;
    } else {
      erroP.removeParagrafoErro(inputEmail)
      erroP.removeParagrafoErro(inputTelefone)
    }
    
    if (inputEmail.value || inputTelefone.value) {
      if (inputEmail.value && !validator.isEmail(inputEmail.value)) {
        const msgError = 'Digite um E-mail valido'
        erroP.paragrafoError(inputEmail, msgError)
        error = true;
      } else {
        erroP.removeParagrafoErro(inputNome)
      }
    }
    

    
    if (!error) el.submit();
  }
}