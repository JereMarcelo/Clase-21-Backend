import { Router } from 'express';


const route = Router();

/**
 * @swagger
 * components:
 *  requestBodies:
 *   registerUser:
 *     type: object
 *     required:
 *        - first_name
 *        - last_name
 *        - email
 *        - password
 *     properties:
 *        first_name:
 *          type: string
 *          description: El nombre del usuario 
 *          example: Jere
 *        last_name:
 *          type: string
 *          description: El apellido del usuario
 *          example: Messi
 *        email: 
 *          type: string
 *          description: El correo electronico del usuario
 *          example: jere.messi10@gmail.com
 *        password:
 *          type: string
 *          description: El password del usuario
 *          example: campeonMundial2022
 */


route.get('/', (req, res) => {
    const { nombre } = req.query;
    req.session.nombre = req.session.nombre ?? nombre;
    req.session.cantidadVisitas = req.session.cantidadVisitas
    ? req.session.cantidadVisitas + 1
    : 1;
const mensaje =
    req.session.cantidadVisitas === 1
    ? `Bienvenido ${req.session.nombre ?? ''}`
    : `${req.session.nombre ?? ''} visito el sitio ${
        req.session.cantidadVisitas
        } veces`;
    res.send(mensaje);
});




export default route;