const yup    = require('yup');
const School = require('../models/School');

const schoolSchema = yup.object().shape({
    name:    yup.string().required('O nome da escola é obrigatório.'),
    address: yup.string().required('O endereço da escola é obrigatório.')
});

// Cadastrar uma nova escola
const createSchool = async (req, res) => {
    try {
        await schoolSchema.validate(req.body, { abortEarly: false });

        const { name, address } = req.body;
        const newSchool = await School.create({ name, address });

        return res.status(201).json(newSchool);

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ erros: error.errors });
        }
        return res.status(500).json({ error: 'Erro ao criar escola.', detalhes: error.message });
    }
};

// Listar todas as escolas cadastradas
const listSchools = async (req, res) => {
    try {
        const schools = await School.findAll({ order: [['name', 'ASC']] });
        return res.status(200).json(schools);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar escolas.', detalhes: error.message });
    }
};

module.exports = { createSchool, listSchools };