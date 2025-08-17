const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutorController');
const authController = require('../controllers/authController');

router.get('/', tutorController.getAllTutors);
router.get('/:id', tutorController.getTutor);

// Protected routes
router.use(authController.protect);

router.post('/become-tutor', tutorController.becomeTutor);
router.post('/book-session', tutorController.bookSession);

module.exports = router;