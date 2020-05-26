const express = require('express');
const multer = require('multer');
const session = require('express-session');

const AuthController = require('../controllers/AuthController');
const ProfileController = require('../controllers/ProfileController');
const RegistrationController = require('../controllers/RegistrationController');
const HomeController = require('../controllers/HomeController');

const upload = multer({ dest: 'public/images/' });

const router = express.Router();

router.use(session({
  secret: 'nagyon titkos',
  resave: false,
  saveUninitialized: true,
}));

router.get('/', HomeController.scoreboard);

router.get('/registration/show', RegistrationController.show);
router.post('/registration/register', upload.single('imageUpload'), RegistrationController.register);
router.get('/registration/verify', RegistrationController.verify);

router.post('/auth/login', AuthController.logIn);
router.get('/auth/logout', AuthController.logOut);

router.get('/profile/show', ProfileController.show);
router.get('/profile/edit', ProfileController.edit);
router.post('/profile/update', upload.none(), ProfileController.update);

module.exports = router;
