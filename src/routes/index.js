import sessionRouter from './session.router.js';
import usuariosRouter from './users.router.js';
import authRouter from './auth.router.js';
import { Router } from 'express';
import mockingRoute from './mocking.router.js';


const route = Router();

route.use('/usuarios', usuariosRouter);
route.use('/session', sessionRouter);
route.use('/auth', authRouter);
route.use('/mockingproducts', mockingRoute);



export default route;  