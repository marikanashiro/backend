const express = require('express');
const { verificarToken, gerarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', (req, res) => {
    const { usuario, senha } = req.body;

    if (senha === 'abcd1234') {
        const token = gerarToken(usuario);
        return res.status(200).json({ token });
    }

    return res.status(401).json({ msg: 'Credenciais inválidas' });
});

router.post('/renovar', verificarToken, (req, res) => {
    const token = gerarToken(req.usuario.email);
    return res.status(200).json({ token });
});

module.exports = router;