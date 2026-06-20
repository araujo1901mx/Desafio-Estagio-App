const express            = require('express');
const router             = express.Router();
const SchoolController   = require('../Controllers/SchoolController');
const authMiddleware     = require('../middlewares/auth');

// Rotas protegidas – o usuário precisa estar logado
router.get('/',  authMiddleware, SchoolController.listSchools);   // Listar escolas
router.post('/', authMiddleware, SchoolController.createSchool);  // Criar escola

module.exports = router;