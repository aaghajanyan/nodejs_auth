const router = require('express').Router();

const { validateRegisterBody, validateLoginBody } = require('../validation');
const {registerUser, loginUser} = require('../controller/User');

router.post('/register', validateRegisterBody, registerUser);
router.post('/login', validateLoginBody, loginUser);

module.exports = router;