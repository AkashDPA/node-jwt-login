//centralized routing, apply middleware for module routes

const auth = require('./auth');
const protected = require('./protected');
const authenticate = require('../middlewares/authenticate');

module.exports = app => {
    app.get('/', (req, res) => {
        res.status(200).send({ message: "Welcome to the AUTHENTICATION API. Register or Login to test Authentication."});
    });
    app.use('/api/auth', auth);
    app.use('/api/protected', authenticate, protected);
};