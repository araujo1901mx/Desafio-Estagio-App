const yup     = require('yup');
const User    = require('../models/User');
const Teacher = require('../models/Teacher');
const School  = require('../models/School');

const teacherSchema = yup.object().shape({
    name:      yup.string().required('O nome é obrigatório.'),
    CPF:       yup.string().length(11, 'O CPF deve ter 11 dígitos.').required('O CPF é obrigatório.'),
    password:  yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres.').required('A senha é obrigatória.'),
    birthday:  yup.date().required('A data de nascimento é obrigatória.').typeError('Data inválida.'),
    school_id: yup.string().uuid('ID de escola inválido.').required('Selecione uma escola.')
});

// Cadastrar um Professor (cria o Usuário automaticamente)
const createTeacher = async (req, res) => {
    try {
        await teacherSchema.validate(req.body, { abortEarly: false });

        const { name, CPF, password, birthday, school_id } = req.body;

        // 1. Valida se a escola existe
        const school = await School.findByPk(school_id);
        if (!school) {
            return res.status(404).json({ error: 'Escola não encontrada.' });
        }

        // 2. Valida se o CPF já está em uso
        const cpfExistente = await User.findOne({ where: { CPF } });
        if (cpfExistente) {
            return res.status(409).json({ error: 'Já existe um usuário cadastrado com esse CPF.' });
        }

        // 3. Cria o Usuário automaticamente para o professor (o Hook do Model cuida do hashing)
        const newUser = await User.create({ name, CPF, password, birthday });

        // 4. Cria o Professor vinculando o Usuário e a Escola
        const newTeacher = await Teacher.create({
            user_id:   newUser.id,
            school_id: school_id
        });

        return res.status(201).json({
            message: 'Professor cadastrado com sucesso!',
            teacher: newTeacher,
            user: { id: newUser.id, name: newUser.name, CPF: newUser.CPF }
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ erros: error.errors });
        }
        return res.status(500).json({ error: 'Erro ao cadastrar professor.', detalhes: error.message });
    }
};

// Listar todos os Professores com seus dados de usuário e escola
const listTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.findAll({
            include: [
                { model: User,   as: 'user',   attributes: ['name', 'CPF', 'birthday'] },
                { model: School, as: 'school', attributes: ['name', 'address'] }
            ]
        });
        return res.status(200).json(teachers);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar professores.', detalhes: error.message });
    }
};

module.exports = { createTeacher, listTeachers };