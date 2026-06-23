const express = require('express');
const cors    = require('cors');

const app = express();

// Inicia a conexão com o banco de dados e todos os Models
require('./database');

// Libera o Angular para chamar esse servidor
app.use(cors());

// Permite receber dados em JSON no corpo das requisições
app.use(express.json());

// ─────────────── Registro das Rotas ───────────────
const loginRoutes   = require('./routes/login');
const userRoutes    = require('./routes/users');
const schoolRoutes  = require('./routes/schools');
const teacherRoutes = require('./routes/teachers');
const studentRoutes = require('./routes/students');

app.use('/api/login',    loginRoutes);
app.use('/api/users',    userRoutes);
app.use('/api/schools',  schoolRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/students', studentRoutes);
// ──────────────────────────────────────────────────

// Tratamento de erros genérico
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
});

// Liga o servidor na porta 3000 (apenas localmente, no Vercel quem controla e o proprio Vercel)
if (!process.env.VERCEL) {
    app.listen(3000, () => console.log(' Servidor rodando na porta 3000'));
}

module.exports = app;