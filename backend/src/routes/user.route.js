import express from 'express';
import { getCurrentUser, getUrlByUser, login, logout, signup } from '../controller/User.controller.js';
import { isAuth } from '../../middleware/isAuth.js';

const AuthRouter = express.Router();

AuthRouter.post('/register', signup);
AuthRouter.post('/login',login);
AuthRouter.post('/logout', logout);
AuthRouter.get('/me', isAuth, getCurrentUser);
AuthRouter.get('/me/urls', isAuth, getUrlByUser);

export default AuthRouter;