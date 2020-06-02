const express = require('express');
const multer = require('multer');
const session = require('express-session');

const AuthController = require('../controllers/AuthController');
const ProfileController = require('../controllers/ProfileController');
const RegistrationController = require('../controllers/RegistrationController');
const HomeController = require('../controllers/HomeController');
const ApiController = require('../controllers/ApiController');

const upload = multer({ dest: 'public/images/' });

const router = express.Router();

router.use(session({
  secret: 'nagyon titkos',
  resave: false,
  saveUninitialized: true,
}));

router.get('/', HomeController.scoreboard);
router.post('/api/saveScore', ApiController.saveScore);
router.post('/api/authenticateUser', ApiController.authenticateUser);

router.get('/registration/show', RegistrationController.show);
router.post('/registration/register', upload.single('imageUpload'), RegistrationController.register);
router.get('/registration/success', RegistrationController.success);
router.get('/registration/verify', RegistrationController.verify);

router.post('/auth/login', AuthController.logIn);
router.get('/auth/logout', AuthController.logOut);

router.get('/profile/show', ProfileController.show);
router.get('/profile/edit', ProfileController.edit);
router.post('/profile/update', upload.single('imageUpload'), ProfileController.update);
router.delete('/profile/edit/deleteImage', ProfileController.delete);

module.exports = router;
