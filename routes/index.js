const express = require('express');
const multer = require('multer');
const session = require('express-session');

const UserController = require('../controller/UserController');
const HomeController = require('../controller/HomeController');
const User = require('../models/User');

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
router.post('/', UserController.logIn);
router.get('/logout', UserController.logOut);
router.get('/myprofile', UserController.showUserProfile);
router.get('/editprofile', async (req, res) => {
  const loggedIn = req.session.loggedIn === true;
  const user = await User.findOne({
    where: { id: req.session.userId },
  });
  res.render('editProfile', {
    loggedIn,
    user: JSON.parse(JSON.stringify(user)),
  });
});
router.post('/editprofile', upload.none(), UserController.updateUserProfile);

module.exports = router;
