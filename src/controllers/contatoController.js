const { async } = require('regenerator-runtime');
const { Contato, buscaPorId, apagarContatos } = require('../models/ContatoModel')

exports.index = (req, res) => {
  const caminho = req.path
  res.render('contato', {
    caminho,
    contato: {}
  })
}

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register();

    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Contato registrado');
    req.session.save(() => res.redirect(`/contato/${contato.contato._id}`));
    return;
  } catch (e) {
    console.log(e);
    res.render('404');
    return
  }
}

exports.ContatoIndex = async (req, res) => { // retorna o contato que acabou de cadastrar
  const caminho = req.path
  if (!req.params.id) return res.render('404')
  const contato = await buscaPorId(req.params.id);
  if (!contato) return res.render('404');
  res.render('contato', { caminho, contato });
}

exports.editContato = async (req, res) => {
  try {
    if (!req.params.id) return res.render('404');
    const contato = new Contato(req.body);
    await contato.edit(req.params.id);

    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Contato atualizado');
    req.session.save(() => res.redirect(`/contato/${contato.contato._id}`));
    return;
  } catch (e) {
    console.log(e)
    res.render('404')
  }
}

exports.deleteContato = async (req, res) => {
  if (!req.params.id) return res.render('404')
  const contato = await apagarContatos(req.params.id);
  if (!contato) return res.render('404');

  req.flash('success', 'Contato apagado');
  req.session.save(() => res.redirect('back'));
  return;
}