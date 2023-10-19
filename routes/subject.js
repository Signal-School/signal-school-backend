const expess = require('express');
const router = expess.Router();
const SubjectController = require('../controllers/SubjectController');

router.post('/subject/create', SubjectController.createSubject);
router.get('/subject/getAll', SubjectController.getAllSubjects);
router.get('/subject/get/:id', SubjectController.getSubjectById);
router.put('/subject/update/:id', SubjectController.updateSubject);
router.delete('/subject/delete/:id', SubjectController.deleteSubject);

module.exports = router;