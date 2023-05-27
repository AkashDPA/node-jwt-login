const express = require('express');
const {check} = require('express-validator');
const Auth = require('../controllers/auth');
const params_validator = require('../middlewares/params_validator');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({message: "You are in the Auth Endpoint. Register or Login to test Authentication."});
});

router.post('/register', [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').not().isEmpty().isLength({min: 6}).withMessage('Must be at least 6 chars long')
], params_validator, Auth.register);


router.post('/login', [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').not().isEmpty(),
], params_validator, Auth.login);

module.exports = router;