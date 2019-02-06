const
    express = require('express'),
    usersRouter = new express.Router(),
    usersCtrl = require('../controllers/users.js'),
    verifyToken = require('../serverAuth').verifyToken;

usersRouter.get('/', usersCtrl.index);
usersRouter.post('/', usersCtrl.create);
usersRouter.post('/authenticate', usersCtrl.authenticate);

usersRouter.use(verifyToken);
usersRouter.get('/:id', usersCtrl.show);
usersRouter.patch('/:id', usersCtrl.update);
usersRouter.delete('/:id', usersCtrl.destroy);

module.exports = usersRouter;