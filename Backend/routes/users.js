const express          = require('express');
const router           = express.Router();
const UserController   = require('../Controllers/UserController');

// POST /api/users – Cadastrar usuário (rota pública, não precisa de login)
router.post('/', UserController.createUser);

module.exports = router;