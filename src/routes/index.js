import sessionRouter from './session.router.js';
import usuariosRouter from './usuarios.router.js';
import authRouter from './auth.router.js';
import { Router } from 'express';
import jwtrouter from './jwt.router.js';


const route = Router();
route.use('/usuarios', usuariosRouter);
route.use('/session', sessionRouter);
route.use('/auth', authRouter);
route.use('/jwt', jwtrouter);




export default route;  