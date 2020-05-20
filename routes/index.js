const express = require('express');
const multer = require('multer');


const UserController = require('../controller/UserController');
const HomeController = require('../controller/HomeController');

const upload = multer({ dest: 'public/images/' });


const router = express.Router();


/* GET home page. */
router.get('/', HomeController.scoreboard);
router.get('/verify', UserController.verify);
router.post('/register', upload.single('imageUpload'), UserController.register);
router.get('/register', (req, res) => {
  res.render('register');
});


module.exports = router;
