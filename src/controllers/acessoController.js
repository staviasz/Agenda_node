const Contato = require('../models/ContatoModel')

exports.acesso = async (req, res) => {
  const contatos = await Contato.buscaContatos();
  const caminho = req.path
  // res.send({caminho})
  res.render('main', {caminho, contatos});
}
