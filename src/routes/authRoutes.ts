import express from 'express';
import { basiclogin, register } from '../controllers/authControllers';

const authRouter = express.Router();

authRouter.post('/login', basiclogin);
authRouter.post('/register', register);

export default authRouter;
