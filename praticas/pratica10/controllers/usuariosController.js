const { cifrarSenha, gerarToken, compararSenha } = require('../middlewares/authMiddleware'); // ← adicione compararSenha
const Usuario = require('../models/usersModel');

const criar = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(422).json({ msg: 'Email e Senha são obrigatórios' });
  }

  try {
    const senhaCifrada = cifrarSenha(senha);

    const novoUsuario = await Usuario.create({
      email,
      senha: senhaCifrada
    });

    return res.status(201).json({
      _id: novoUsuario._id,
      email: novoUsuario.email
    });

  } catch (err) {
    return res.status(422).json({ msg: 'Email e Senha são obrigatórios' });
  }
};

const entrar = async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const usuarioEncontrado = await Usuario.findOne({ email: usuario });

    if (!usuarioEncontrado || !compararSenha(senha, usuarioEncontrado.senha)) {
      return res.status(401).json({ msg: 'Credenciais inválidas' });
    }

    const token = gerarToken({ email: usuarioEncontrado.email });

    return res.status(200).json({ token });

  } catch (err) {
    console.error(err);
    return res.status(401).json({ msg: 'Credenciais inválidas' });
  }
};

const renovar = async (req, res) => {
  try {
    const novoToken = gerarToken({ email: req.usuario.email });
    return res.status(200).json({ token: novoToken });
  } catch (err) {
    return res.status(401).json({ msg: 'Token inválido' });
  }
};

const remover = async (req, res) => {
  try {
    await Usuario.findOneAndDelete({ _id: req.params.id });
    return res.status(204).send();
  } catch (err) {
    return res.status(404).json({ msg: 'Usuário não encontrado' });
  }
};

module.exports = {
  criar,
  entrar,
  renovar,
  remover
};