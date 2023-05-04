export default class ParagrafoErro {
  constructor (msg){
    this.msg = msg
  }

  paragrafoError(el, msg) {
    const novoP = this.criarParagrafo(msg)
    const verificaExisteP = el.nextElementSibling
    if (!verificaExisteP) 
      el.insertAdjacentElement("afterend", novoP)
  }

  criarParagrafo(msg) {
    const novoP = document.createElement('p');
    novoP.textContent = msg;
    this.styleNovoParagrafo(novoP)
    return novoP
  }

  styleNovoParagrafo(paragrafo) {
    paragrafo.style.color = 'red'
    paragrafo.style.fontSize = '14px'
    paragrafo.style.margin = '0'
    return paragrafo
  }

  removeParagrafoErro(el) {
    const verificaExisteP = el.nextElementSibling
    if (verificaExisteP) return verificaExisteP.remove()
  }
}