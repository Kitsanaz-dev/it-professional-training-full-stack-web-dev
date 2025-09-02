const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.get('/get-course', courseController.getCourses);
router.post('/create-course', courseController.createCourse);
router.put('/update-course/:id', courseController.updateCourse);
router.delete('/delete-course/:id', courseController.deleteCourse);

module.exports = router;