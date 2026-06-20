const express            = require('express');
const router             = express.Router();
const TeacherController  = require('../Controllers/TeacherController');
const authMiddleware     = require('../middlewares/auth');

router.get('/',  authMiddleware, TeacherController.listTeachers);
router.post('/', authMiddleware, TeacherController.createTeacher);

module.exports = router;