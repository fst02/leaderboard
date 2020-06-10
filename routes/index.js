const express = require('express');
const multer = require('multer');
const session = require('express-session');
const jwt = require('express-jwt');

const AuthController = require('../controllers/AuthController');
const ProfileController = require('../controllers/ProfileController');
const RegistrationController = require('../controllers/RegistrationController');
const HomeController = require('../controllers/HomeController');
const ApiController = require('../controllers/ApiController');
const secrets = require('../config/secrets.json');

const upload = multer({
  dest: 'public/images/',
  limits: { fileSize: 2 * 1024 * 1024 },
});

const router = express.Router();

router.use(session({
  secret: secrets.sessionSecret,
  resave: false,
  saveUninitialized: true,
}));

router.get('/', HomeController.scoreboard);
router.post('/api/saveScore', jwt({ secret: secrets.jwtSecret }), ApiController.saveScore);
router.post('/api/authenticateUser', ApiController.authenticateUser);
router.post('/api/verifyToken', ApiController.verifyToken);

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
