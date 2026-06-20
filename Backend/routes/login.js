const express           = require('express');
const router            = express.Router();
const SessionController = require('../Controllers/SessionController');
// POST /api/login
router.post('/', SessionController.login);
module.exports = router;