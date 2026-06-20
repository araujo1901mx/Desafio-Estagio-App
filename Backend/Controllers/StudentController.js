const yup     = require('yup');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const User    = require('../models/User');

const studentSchema = yup.object().shape({
    name:       yup.string().required('O nome é obrigatório.'),
    CPF:        yup.string().length(11, 'O CPF deve ter 11 dígitos.').required('O CPF é obrigatório.'),
    birthday:   yup.date().required('A data de nascimento é obrigatória.').typeError('Data inválida.'),
    teacher_id: yup.string().uuid('ID de professor inválido.').required('Selecione um professor.')
});

// Cadastrar um Aluno vinculado a um Professor
const createStudent = async (req, res) => {
    try {
        await studentSchema.validate(req.body, { abortEarly: false });

        const { name, CPF, birthday, teacher_id } = req.body;

        // 1. Valida se o professor existe
        const teacher = await Teacher.findByPk(teacher_id);
        if (!teacher) {
            return res.status(404).json({ error: 'Professor não encontrado.' });
        }

        // 2. Valida CPF duplicado
        const cpfExistente = await Student.findOne({ where: { CPF } });
        if (cpfExistente) {
            return res.status(409).json({ error: 'Já existe um aluno cadastrado com esse CPF.' });
        }

        // 3. Cria o aluno
        const newStudent = await Student.create({ name, CPF, birthday, teacher_id });

        return res.status(201).json(newStudent);

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ erros: error.errors });
        }
        return res.status(500).json({ error: 'Erro ao cadastrar aluno.', detalhes: error.message });
    }
};

// Listar todos os Alunos com o nome do professor
const listStudents = async (req, res) => {
    try {
        const students = await Student.findAll({
            include: [{
                model: Teacher,
                as: 'teacher',
                include: [{ model: User, as: 'user', attributes: ['name'] }]
            }]
        });
        return res.status(200).json(students);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar alunos.', detalhes: error.message });
    }
};

module.exports = { createStudent, listStudents };