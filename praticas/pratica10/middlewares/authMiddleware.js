const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const verificarToken = (req, res, next) => {
  let token = req.headers.authorization || '';

  if (token.startsWith('Bearer ')) {
    token = token.slice(7);
  }

  if (!token) {
    return res.status(401).json({ msg: 'Token inválido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token inválido' });
  }
};

function gerarToken(payload) {
  try {
    const expiresIn = process.env.JWT_EXPIRES; 
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    return token;
  } catch (err) {
    throw Error("Erro ao gerar o token");
  }
}

function cifrarSenha(senha) {
  const salto = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(senha, salto);
  return hash;
}

function compararSenha(senha, hash) {
  return bcryptjs.compareSync(senha, hash);
}

module.exports = { verificarToken, gerarToken, cifrarSenha, compararSenha };