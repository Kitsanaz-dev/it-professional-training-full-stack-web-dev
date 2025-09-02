const express = require('express');
const router = express.Router();
const helloController = require('../controllers/helloController');

router.get('/', helloController.getHello);
router.get('/goodbye', helloController.getGoodbye);
router.get('/world', helloController.getHelloWorld);
router.post('/', helloController.postHello);
router.get('/user/:name', helloController.getHelloUser);

module.exports = router;