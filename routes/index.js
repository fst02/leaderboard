const express = require('express');
const multer = require('multer');
const session = require('express-session');

const UserController = require('../controller/UserController');
const HomeController = require('../controller/HomeController');

const upload = multer({ dest: 'public/images/' });

const router = express.Router();

router.use(session({
  secret: 'nagyon titkos',
}));
router.get('/', HomeController.scoreboard);
router.get('/verify', UserController.verify);
router.post('/register', upload.single('imageUpload'), UserController.register);
router.get('/register', (req, res) => {
  res.render('register');
});
router.post('/', UserController.select);
router.get('/logout', UserController.logOut);

module.exports = router;
