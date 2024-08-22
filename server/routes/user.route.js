const express = require('express');
const UserController = require('../controllers/user.controller');

const UserRouter = express.Router();

UserRouter.post('/register', UserController.register);
UserRouter.post('/login', UserController.login);

module.exports = UserRouter;