const Login = require('../models/LogiModel')

exports.index = (req, res) => {
    if (req.session.user) return res.render('main')
    res.render('login')
};

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors); // registrar os erro e coloca-los no flash
            req.session.save(() => { // salva a sessao e cria um callback para redirecionar a pagina anterior atraves do argumento 'back'
                return res.redirect('back');
            });
            return
        }

        req.flash('success', 'Seu usuário foi criado com sucesso.'); // registrar os erro e coloca-los no flash
        req.session.save(() => { // salva a sessao e cria um callback para redirecionar a pagina anterior atraves do argumento 'back'
            return res.redirect('back');
        });
    } catch (e) {
        console.log(e)
        return res.render('404')
    }
}

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors); // registrar os erro e coloca-los no flash
            req.session.save(() => { // salva a sessao e cria um callback para redirecionar a pagina anterior atraves do argumento 'back'
                return res.redirect('back');
            });
            return
        }

        req.flash('success', 'Acesso liberado.'); // registrar os erro e coloca-los no flash
        req.session.user = login.user;
        req.session.save(() => { // salva a sessao e cria um callback para redirecionar a pagina anterior atraves do argumento 'back'
            return res.redirect('back');
        });
    } catch (e) {
        console.log(e)
        return res.render('404')
    }
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}