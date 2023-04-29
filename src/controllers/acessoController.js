const Contato = require('../models/ContatoModel')

exports.acesso = async (req, res) => {
    const contatos = await Contato.buscaContatos();
    res.render('main', { contatos });
}
