const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const SECRET = 'desafio_estagio_secret_key';

const login = async (req, res) => {
    try {
        const { CPF, password } = req.body;

        // Validação básica
        if (!CPF || !password) {
            return res.status(400).json({ error: 'CPF e senha são obrigatórios.' });
        }

        // 1. Busca o usuário pelo CPF no banco
        const user = await User.findOne({ where: { CPF } });

        if (!user) {
            // Mensagem genérica por segurança (não revela se o CPF existe ou não)
            return res.status(401).json({ error: 'CPF ou senha incorretos.' });
        }

        // 2. Compara a senha digitada com o hash salvo no banco
        const senhaCorreta = await bcrypt.compare(password, user.password);

        if (!senhaCorreta) {
            return res.status(401).json({ error: 'CPF ou senha incorretos.' });
        }

        // 3. Gera o Token JWT que expira em 8 horas
        const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '8h' });

        // 4. Devolve o token e alguns dados do usuário para o Angular
        return res.status(200).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                CPF: user.CPF
            }
        });

    } catch (error) {
        return res.status(500).json({ error: 'Erro interno ao fazer login.', detalhes: error.message });
    }
};

module.exports = { login };