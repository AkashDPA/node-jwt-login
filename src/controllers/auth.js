const User = require('../models/user');

// @route POST api/auth/register
// @desc Register user
// @access Public
exports.register = (req, res) => {
    if(!req.body.email) return res.status(400).json({message: 'Email address cannot be empty'});
    User.findOne({email: req.body.email})
        .then(user => {
            if (user) return res.status(401).json({message: 'The email address you have entered is already used.'});
            // Create and save the user
            const newUser = new User(req.body);
            newUser.save()
                .then(user => res.status(200).json({token: user.generateJWT()}))
                .catch(err => res.status(500).json({message:err.message}));
        })
        .catch(err => res.status(500).json({success: false, message: err.message}));
};

// @route POST api/auth/login
// @desc Login user and return JWT token
// @access Public
exports.login = (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) return res.status(401).json({msg: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.'});

            //validate password
            if (!user.comparePassword(req.body.password)) return res.status(401).json({message: 'Invalid email or password'});

            // Login successful, write token
            res.status(200).json({token: user.generateJWT()});
        })
        .catch(err => res.status(500).json({message: err.message}));
};