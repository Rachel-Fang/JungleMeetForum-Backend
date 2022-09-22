const { Router } = require('express');
const { getUserById, createUser, resetPassword } = require('../controllers/user');

const userRouter = Router();

userRouter.get('/:id', getUserById);

userRouter.post('/', createUser);
userRouter.post('/reset/', resetPassword);

module.exports = userRouter;
