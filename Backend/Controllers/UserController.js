const yup  = require('yup');
const User = require('../models/User');

// Esquema de validação com yup
const userSchema = yup.object().shape({
    name:     yup.string().required('O nome é obrigatório.'),
    CPF:      yup.string().length(11, 'O CPF deve ter 11 dígitos.').required('O CPF é obrigatório.'),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres.').required('A senha é obrigatória.'),
    birthday: yup.date().required('A data de nascimento é obrigatória.').typeError('Data de nascimento inválida.')
});

const createUser = async (req, res) => {
    try {
        // 1. Valida os dados recebidos
        await userSchema.validate(req.body, { abortEarly: false });

        const { name, CPF, password, birthday } = req.body;

        // 2. Verifica se o CPF já está cadastrado
        const cpfExistente = await User.findOne({ where: { CPF } });
        if (cpfExistente) {
            return res.status(409).json({ error: 'Já existe um usuário cadastrado com esse CPF.' });
        }

        // 3. Cria o usuário (a senha é criptografada automaticamente pelo Hook no Model)
        const newUser = await User.create({ name, CPF, password, birthday });

        // Não devolvemos a senha para o Frontend, mesmo criptografada
        const { password: _, ...userSemSenha } = newUser.toJSON();

        return res.status(201).json(userSemSenha);

    } catch (error) {
        // Erro de validação do Yup
        if (error.name === 'ValidationError') {
            return res.status(400).json({ erros: error.errors });
        }
        return res.status(500).json({ error: 'Erro ao criar usuário.', detalhes: error.message });
    }
};

module.exports = { createUser };