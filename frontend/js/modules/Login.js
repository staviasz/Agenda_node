import validator from "validator";

import ParagrafoErro from "./ParagrafoErro";


export default class Login {
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
      const emailInput = el.querySelector('input[name="email"]'); 
      const senhaInput = el.querySelector('input[name="senha"]');
      this.validate(el, emailInput, senhaInput)
    });
  }
  
  validate(el, emailInput, senhaInput) {
    let error = false; 
    const erroP = new ParagrafoErro
    
    if (!validator.isEmail(emailInput.value)) {
      const msgError = 'Digite um E-mail valido'
      erroP.paragrafoError(emailInput, msgError)
      error = true;
    } else {
      erroP.removeParagrafoErro(emailInput)
    }
    
    if (senhaInput.value.length < 3 || senhaInput.value.length > 20) {
      const msgError = 'Digite uma senha de 3 a 20 caracteres'
      erroP.paragrafoError(senhaInput, msgError)
      error = true;
    } else {
      erroP.removeParagrafoErro(senhaInput)
    }

    if (!error) el.submit();
  }
}

// 