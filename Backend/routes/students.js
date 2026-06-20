const express            = require('express');
const router             = express.Router();
const StudentController  = require('../Controllers/StudentController');
const authMiddleware     = require('../middlewares/auth');

router.get('/',  authMiddleware, StudentController.listStudents);
router.post('/', authMiddleware, StudentController.createStudent);

module.exports = router;