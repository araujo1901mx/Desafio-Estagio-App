const jwt = require('jsonwebtoken');

const SECRET = 'desafio_estagio_secret_key';

module.exports = (req, res, next) => {
    // O Frontend deve enviar o token no cabeçalho: Authorization: Bearer <token>
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Token inválido ou expirado.' });
    }
};
